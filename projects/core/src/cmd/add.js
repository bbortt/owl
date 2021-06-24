const { chmodSync, existsSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { spawnSync } = require('child_process');

const { cosmiconfigSync } = require('cosmiconfig');
const cosmiconfig = cosmiconfigSync('owl').search();

const { DEFAULT_ENCODING } = require('../common/constants');

const supportedHooks = [
  'applypatch-msg',
  'commit-msg',
  'fsmonitor-watchman',
  'post-update',
  'pre-applypatch',
  'pre-commit',
  'pre-merge-commit',
  'pre-push',
  'pre-rebase',
  'pre-receive',
  'prepare-commit-msg',
  'update',
];

const ensureGitHookInstalled = (hooksDir, hookType) => {
  const hookFile = resolve(hooksDir, hookType);
  if (existsSync(hookFile)) {
    console.log(
      `owl - hook file for '${hookType}' already exists, skip linking`,
    );
    return;
  }

  const hookArg = `#!/usr/bin/env bash

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
  if (args.length < 2) {
    throw new Error(
      `owl - invalid 'add' command. usage is: owl add [TYPE] [COMMAND]`,
    );
  }

  if (!cosmiconfig) {
    throw new Error("owl - cannot find any configuration, did you run 'init'?");
  }

  const hooksDir = String(
    spawnSync('git', ['config', 'core.hooksPath'], { stdio: 'pipe' }).stdout,
  ).trim();

  if (!hooksDir) {
    throw new Error(
      "owl - git has no 'core.hooksPath' configured, did you run 'install'?",
    );
  }

  const { config, filepath } = cosmiconfig;
  config.hooks = config.hooks || {};

  try {
    const hookType = args[0];
    if (supportedHooks.includes(hookType)) {
      addHook(config.hooks, hookType, args[1]);
      ensureGitHookInstalled(hooksDir, hookType);
    } else {
      throw new Error(
        `owl - invalid hook type '${hookType}'! supported are: ${supportedHooks.join()}`,
      );
    }

    writeFileSync(
      filepath,
      `${JSON.stringify(config, null, 2)}\n`,
      DEFAULT_ENCODING,
    );
  } catch (e) {
    throw e;
  }

  console.log('owl - hook successfully added');
};
