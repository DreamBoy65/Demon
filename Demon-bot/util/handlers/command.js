const { readdirSync } = require("fs");
const chalk = require("chalk");
const gradient = require("gradient-string");

module.exports = (client) => {
  
 readdirSync(`${process.cwd()}/Demon-bot/commands/`).forEach((dir) => {
   
  const commands = readdirSync(`${process.cwd()}/Demon-bot/commands/${dir}/`).filter((file) => file.endsWith(".js"));
   
  for (let file of commands) {
    
   let pull = require(`${process.cwd()}/Demon-bot/commands/${dir}/${file}`);
    
   try {
     
    if (typeof pull.name != "string" || typeof pull != "object") throw new Error("Missing a name or name is not a string");
     
    if (pull.category && typeof pull.category !== "string") throw new Error("Category is not a string");
     
    if (pull.description && typeof pull.description !== "string") throw new Error("Description is not a string");
     
    if (pull.usage && typeof pull.usage !== "string") throw new Error("Usage is not a string");
     
    if (pull.name && pull.category) {
     client.commands.set(pull.name, pull);
    }

    if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
   } catch (error) {
      client.logger.error(error, "commands")
    }
  }
 });
  
 const logo =
  gradient.pastel.multiline(
   ["DEMON............BOO"].join("\n")
  ) + "\n       ~ By Dream ~       \n\n";
  
 console.log(chalk.bold.bgBlack(logo));
  
 console.log(chalk.bold(chalk.blue.bold("[Demon]")) + chalk.cyan.bold(" Please wait... Loading commands..."));

 console.log(chalk.bold(chalk.blue.bold("[Demon]")) + chalk.cyan.bold(" Successfully loaded " + chalk.blue.underline(`${client.commands.size}`) + " commands!"));
  
};