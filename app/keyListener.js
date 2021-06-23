const logger = require("./logger");
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.isTTY;

const keyListener = process.stdin.on('keypress', (str, key) => {

    if (!["return","enter"].includes(key.name)) {
        logger.log(`Key Pressed: '${key.name}'`)
    }
    if (key.name === 'x') {
        logger.log(`Goodbye CLI User!`)
        process.exit(0);
    }});

module.exports = keyListener;