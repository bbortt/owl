#!/usr/bin/env node

/**
 * Copyright (c) 2021 Timon Borter
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */

const { readFileSync } = require('fs');
const { resolve } = require('path');
const { spawnSync } = require('child_process');

const [, , cmd, ...args] = process.argv;

const hooksDir = String(
  spawnSync('git', ['config', 'core.hooksPath'], { stdio: 'pipe' }).stdout,
).trim();
const configFile = resolve(hooksDir, '.owlrc.json');
const config = JSON.parse(readFileSync(configFile, 'utf-8'));
config.hooks = config.hooks || {};

const printHooks = (hooks, hookType, separator) =>
  console.log((hooks[hookType] || []).join(separator));

switch (cmd) {
  case 'pre-commit':
    printHooks(config.hooks, 'preCommit', args[0]);
    break;
  default:
    throw new Error(`invalid hook configuration`);
}
