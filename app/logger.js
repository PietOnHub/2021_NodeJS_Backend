const EventEmitter = require('events');

class Logger extends EventEmitter{
    log(msg, args) {

        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;

        this.emit("loggedMessage", dateTime, msg, args);
    }
}

module.exports = Logger;