'use strict'

const chalk = require('chalk');

class LoggerUtil {

    static init() {
        global.logger = LoggerUtil;
    }

    static info(msg, tag) {
        console.log(chalk.yellow(`[${tag || 'INFO'}] ${msg}`));
    }

    static success(msg, tag) {
        console.log(chalk.green(`[${tag || 'SUCCESS'}] ${msg}`));
    }

    static error(msg, tag) {
        console.log(chalk.red(`[${tag || 'ERROR'}] ${msg}`));
    }

}

module.exports = LoggerUtil.init();