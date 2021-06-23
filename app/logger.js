const EventEmitter = require('events');

function getDateTime() {
    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    return dateTime = cDate + ' ' + cTime;
}

class Logger extends EventEmitter{

    log(msg, args) { 
        this.emit("loggedMessage", getDateTime(), msg, args, "white");
    }

    warn(msg, args) {
        this.emit("loggedMessage", getDateTime(), msg, args, "yellow");
    }

    error(msg, args) {
        this.emit("loggedMessage", getDateTime(), msg, args, "red");
    }
}

module.exports = Logger;