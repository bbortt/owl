const { copyFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { spawnSync } = require('child_process');

const { DEFAULT_ENCODING, OWL_RC_FILE_NAME } = require('../common/constants');

const defaultConfig = { hooks: {} };

module.exports = (dir = '.owl') => {
  if (spawnSync('git', ['rev-parse']).status !== 0) {
    console.error('owl - not in git repository');
    return;
  }

  if (!resolve(process.cwd(), dir).startsWith(process.cwd())) {
    throw new Error('trying to install outside repository!');
  }

  if (!existsSync(resolve(process.cwd(), '.git'))) {
    throw new Error('.git directory not found!');
  }

  try {
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
    writeFileSync(
      resolve(dir, OWL_RC_FILE_NAME),
      `${JSON.stringify(defaultConfig, null, 2)}\n`,
      DEFAULT_ENCODING,
    );

    copyFileSync(resolve(__dirname, '../bin/owl.js'), resolve(dir, 'owl.js'));
    writeFileSync(resolve(dir, '.gitignore'), 'owl.js\n', DEFAULT_ENCODING);

    const { error } = spawnSync('git', ['config', 'core.hooksPath', dir]);
    if (error) {
      throw error;
    }
  } catch (e) {
    throw e;
  }

  console.log('owl - hook successfully installed');
};
