//modules
const chalk = require('chalk');
require("./website")
console.log(
	chalk.bold(chalk.blue.bold('[Demon]')) +
		chalk.cyan.bold('LOADING............')
);
console.log(chalk.red(' {\\__/}\n( • . •)\n/ >  ❤️  u want this?'));

const Bot = require("./struct/client")

const client = new Bot(require("./config/Config"))

client.listentoProcessEvents([
  'unhandledRejection',
  'uncaughtException'
], { ignore: false });
  
client.init();