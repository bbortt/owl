#!/usr/bin/env node
const add = require('./cmd/add');
const init = require('./cmd/init');
const install = require('./cmd/install');

const [, , cmd, ...args] = process.argv;

const help = () => {
  console.log(`
🦉 OWL - GIT hooks made easy.
Usage: owl [COMMAND] args..
\tinstall [dir=.owl]
\t\tinstall 'owl.js' binary.
\t\t--force\tinstall outside process directory.
\tinit
\t\tinitialize valid '.owlrc.json'.
\tadd [TYPE] [COMMAND]
\t\tadd a hook.
\thelp
\t\tprint this help.`);
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
    console.error(`owl - unknown command: try 'help'!`);
    help();
}
