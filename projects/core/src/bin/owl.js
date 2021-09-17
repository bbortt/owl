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

const { cosmiconfigSync } = require('cosmiconfig');

const SUPPORTED_CMDS = ['add', 'init', 'install'];
const SUPPORTED_HOOKS = [
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

const cosmiconfig = cosmiconfigSync('owl').search();

if (!cosmiconfig) {
  console.error('owl - cannot find any configuration, skipping!');
  return;
}

const [, , cmd, ...args] = process.argv;

const { config } = cosmiconfig;
config.hooks = config.hooks || {};

const printHooks = (hooks, hookType, separator) =>
  console.log((hooks[hookType] || []).join(separator));

if (SUPPORTED_CMDS.includes(cmd)) {
  // Not a hook
  return;
}

if (!SUPPORTED_HOOKS.includes(cmd)) {
  throw new Error(`owl - invalid hook configuration: ${cmd}`);
}

printHooks(config.hooks, cmd, args[0]);

module.exports = [SUPPORTED_HOOKS];
