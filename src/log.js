const Helpers = require('./helpers');
const Events = require('./events');
const sha256 = require('./lib/sha256');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const Log = {};

/**
 * Write log
 * @param logObj
 * @param config
 */
Log.write = (logObj, config) => {

    // Add time and hash to log object
    logObj.time = Helpers.getLocaleISODate();
    logObj.hash = sha256(logObj.message);

    if (Helpers.isBrowser()) {

        logObj.useragent = navigator.userAgent;
        if(config.logging) {
            let logName = 'katch';
            let logDayKey = Helpers.getLocaleISODate('date');
            let logAtDay = JSON.parse(localStorage.getItem(logName)) || {};

            if (!logAtDay[logDayKey])
                logAtDay[logDayKey] = [];

            logAtDay[logDayKey].push(logObj);

            try {
                localStorage.setItem(logName, JSON.stringify(logAtDay));
            } catch (e) {
                localStorage.clear();
                localStorage.setItem(logName, JSON.stringify(logAtDay));
            }
        }
    } else {

        let filename = Helpers.getLocaleISODate('date') + '.log';
        let folderPath = config.writeFile.folderPath;
        let fileContent = '';
        let prefix = config.writeFile.prefix;

        logObj.host = os.hostname();
        logObj.pid = process.pid;
        logObj.platform = process.platform;

        if(config.logging) {
            if (config.writeFile.humanize) {
                let separator = '------------------------------------------------------------------------------------';
                fileContent = `[${logObj.time}] [${logObj.level}] [${logObj.code}] [${logObj.host}] [${logObj.hash}] \n${logObj.message}\n${separator}\n`;
            } else {
                fileContent = JSON.stringify(logObj) + '\n';
            }
            /*
            If writeFile is falsy do not write
             */
            if (config.writeFile) {
                mkdirp.sync(folderPath);
                fs.appendFileSync(`${folderPath}/${prefix}${filename}`, fileContent);
            }
        }
    }

    Events.fire('log', logObj);
};

module.exports = Log;