#!/usr/bin/env node
const add = require('./cmd/add');
const init = require('./cmd/init');
const install = require('./cmd/install');

const [, , cmd, ...args] = process.argv;

const help = () => {
  // TODO: Print something useful
};

switch (cmd) {
  case 'install':
    install(args[0], args.slice(1, args.length));
    break;
  case 'init':
    init();
    break;
  case 'add':
    add(args);
    break;
  case 'help':
    help();
    break;
  default:
    console.error('owl - unknown command!');
    help();
}
