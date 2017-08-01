const Helpers = require('./helpers');
const Events = require('./events');
const sha256 = require('./sha256');
const fs = require('fs');

let defaultOpts = {
    writeFile: {
        folderPath: './errors'
    }
};

/**
 * Catchy
 * @see https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
 * @param opts {object} options object
 */
function catchy(opts) {

    if (typeof opts === 'object') {
        catchy.opts = Helpers.defaults(opts, defaultOpts);
    }

    if (Helpers.isBrowser()) {
        window.onerror = function (msg, url, lineNo, columnNo, error) {
            catchy.captureError(error, {
                message: msg,
                url: url,
                lineNo: lineNo,
                columnNo: columnNo
            });
            return false;
        }
    } else {
        process.on('uncaughtException', (error) => {
            catchy.captureError(error);
        });
    }
}

/**
 * Catch error
 * @param error {Error} error object
 * @param params {Object} optional params object
 */
catchy.captureError = (error, params = {}) => {
    Events.fire('error', error, params);
    Events.fire(`type${error.name}`, error, params);
    Events.fire('beforeLog', error, params);

    let logObj = {
        time: Helpers.getLocaleISODate(),
        hash: sha256(error.stack),
        error: error.stack,
        params: params
    };

    if (Helpers.isBrowser()) {

        let logName = 'catchy-' + Helpers.getLocaleISODate('date');
        let logAtDay = JSON.parse(localStorage.getItem(logName)) || [];
        logAtDay.push(logObj);
        localStorage.setItem(logName, JSON.stringify(logAtDay));

    } else if (Helpers.isServer()) {

        let folderPath = catchy.opts.writeFile.folderPath;
        let filename = Helpers.getLocaleISODate('date') + '.log';
        let separator = '------------------------------------------------------------------------------------';
        let fileContent = `${logObj.time} ${logObj.hash}\n${logObj.error}\n${separator}\n`;

        /*
        If writeFile is falsy do not write
         */
        if(catchy.opts.writeFile) {
            if (!fs.existsSync(folderPath))
                fs.mkdirSync(folderPath);
            fs.appendFileSync(`${folderPath}/${filename}`, fileContent);
        }
    }

    Events.fire('afterLog', error, params);
};

/**
 * Wrapper function
 * @type {function(*)}
 */
catchy.wrap = (func => {
   try {
       func();
   } catch (e) {
       catchy.captureError(e);
   }
});

/**
 * Call events
 * @param event {string} event name
 * @param callback {function} callback function
 */
catchy.on = Events.on;

module.exports = catchy;