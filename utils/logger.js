const chalk = require('chalk');

const logger = (chalk) => {
    return {
        done: (input) => {
            const log = chalk.greenBright(`[✔] ${input}`);
            return console.log(log);
        },
        info: (input) => {
            const log = chalk.yellowBright(`[!] ${input}`);
            return console.log(log);
        },
        error: (input) => {
            const log = chalk.red(`[X] ${input}`);
            return console.log(log);
        },
    }
}

module.exports = logger(chalk);