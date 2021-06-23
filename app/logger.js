const EventEmitter = require('events');
const chalk = require("chalk");

function getDateTime() {
    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    return dateTime = cDate + ' ' + cTime;
}

function zerofy(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

const places = 4;

class Logger extends EventEmitter{

    constructor() {
        super();
        this.counter = 0;
    }

    log(msg, args) { 
        this.counter++;
        this.emit("loggedMessage", getDateTime(), zerofy(this.counter,places), msg, args, "white");
    }

    warn(msg, args) {
        this.counter++;
        this.emit("loggedMessage", getDateTime(), zerofy(this.counter,places), msg, args, "yellow");
    }

    error(msg, args) {
        this.counter++;
        this.emit("loggedMessage", getDateTime(), zerofy(this.counter,places), msg, args, "red");
    }
}

const logger = new Logger;

logger.on("loggedMessage", (datetime, count, msg, args, color) => {
    console.log(
        chalk["magenta"](count) + " " + 
        chalk[color](`${datetime}`) + " | " + 
        chalk[color](`${msg} ${(args) ? JSON.stringify(args).replace(/[{}]/g, '') : ""}`));
});

module.exports = logger;

