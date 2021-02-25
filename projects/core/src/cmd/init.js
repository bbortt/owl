const { copyFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { spawnSync } = require('child_process');

const { cosmiconfigSync } = require('cosmiconfig');
const cosmiconfig = cosmiconfigSync('owl').search();

const { DEFAULT_ENCODING } = require('../common/constants');

const defaultConfig = { hooks: {} };

module.exports = () => {
  if (spawnSync('git', ['rev-parse']).status !== 0) {
    console.error('owl - not in git repository!');
    return;
  }

  if (!existsSync(resolve(process.cwd(), '.git'))) {
    throw new Error('owl - .git directory not found!');
  }

  if (cosmiconfig) {
    console.error(
      `owl - configuration already exists in '${cosmiconfig.filepath}', skipping!`,
    );
    return;
  }

  const defaultConfigFile = resolve(process.cwd(), '.owlrc.json');
  console.log(`owl - initializing config in '${defaultConfigFile}'`);

  writeFileSync(
    defaultConfigFile,
    `${JSON.stringify(defaultConfig, null, 2)}\n`,
    DEFAULT_ENCODING,
  );
};
