const { chmodSync, existsSync, readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { spawnSync } = require('child_process');

const { DEFAULT_ENCODING, OWL_RC_FILE_NAME } = require('../common/constants');

const supportedHooks = ['pre-commit'];

const ensureGitHookInstalled = (hooksDir, hookType) => {
  const hookFile = resolve(hooksDir, hookType);
  if (existsSync(hookFile)) {
    // TODO: Maybe debug log?
    console.log(
      `owl - hook file for '${hookType}' already exists, skip linking`,
    );
    return;
  }

  const hookArg = `#!/usr/bin/env sh

IFS=',' read -r -a array <<< $(node $(dirname "$0")/owl.js ${hookType} $IFS)
for i in "\${array[@]}"; do
  $i
done
`;

  writeFileSync(hookFile, hookArg, DEFAULT_ENCODING);
  chmodSync(hookFile, 0o0755);
};

const addHook = (hooks, hookType, command) => {
  hooks[hookType] = hooks[hookType] || [];
  hooks[hookType].push(command.replace(/"/g, "'"));
  return hooks;
};

module.exports = args => {
  const hooksDir = String(
    spawnSync('git', ['config', 'core.hooksPath'], { stdio: 'pipe' }).stdout,
  ).trim();
  const configFile = resolve(hooksDir, OWL_RC_FILE_NAME);
  const config = JSON.parse(readFileSync(configFile, DEFAULT_ENCODING));
  config.hooks = config.hooks || {};

  try {
    const hookType = args[0];
    switch (hookType) {
      case 'pre-commit':
        addHook(config.hooks, hookType, args[1]);
        ensureGitHookInstalled(hooksDir, hookType);
        break;
      default:
        throw new Error(
          `invalid hook type '${hookType}'! supported are: ${supportedHooks.join()}`,
        );
    }

    writeFileSync(
      configFile,
      `${JSON.stringify(config, null, 2)}\n`,
      DEFAULT_ENCODING,
    );
  } catch (e) {
    throw e;
  }

  console.log('owl - hook successfully added');
};
