const { copyFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { spawnSync } = require('child_process');

const { DEFAULT_ENCODING } = require('../common/constants');

module.exports = (dir = '.owl', args = []) => {
  const force = args.includes('--force')

  if (spawnSync('git', ['rev-parse']).status !== 0) {
    console.error('owl - not in git repository!');
    return;
  }

  const fullPath = resolve(process.cwd(), dir);
  if (!fullPath.startsWith(process.cwd()) && !force) {
    throw new Error('owl - trying to install outside repository!');
  }

  try {
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath);
    }

    copyFileSync(resolve(__dirname, '../bin/owl.js'), resolve(fullPath, 'owl.js'));
    writeFileSync(resolve(fullPath, '.gitignore'), 'owl.js\n', DEFAULT_ENCODING);

    const { error } = spawnSync('git', ['config', 'core.hooksPath', fullPath]);
    if (error) {
      throw error;
    }
  } catch (e) {
    throw e;
  }

  console.log('owl - hook successfully installed');
};
