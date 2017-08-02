const Helpers = require('./helpers');
const Log = require('./log');
const Events = require('./events');
const sha256 = require('./lib/sha256');

/**
 * Default options
 * @type {{logging: boolean, writeFile: {prefix: string, humanize: boolean, folderPath: string}}}
 */
const defaultConfig = {
    logging: true,
    writeFile: {
        prefix: '',
        humanize: true,
        folderPath: './logs'
    }
};

/**
 * katch
 * @constructor
 * @see https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
 * @param opts {object} options object
 */
function katch(opts) {

    katch.setup(opts);

    if (Helpers.isBrowser()) {
        window.onerror = function (msg, url, lineNo, columnNo, error) {
            katch.error(error, {
                message: msg,
                url: url,
                lineNo: lineNo,
                columnNo: columnNo
            });
        }
    } else {
        process.on('uncaughtException', katch.error);
    }

    return katch;
}

/**
 * Config params
 * @type {{}}
 */
katch.config = defaultConfig;

/**
 * Set config
 * @param opts {Object} configuration options
 */
katch.setup = (opts)=>{
    if (typeof opts === 'object') {
        katch.config = Helpers.defaults(opts, defaultConfig);
    }
};

/**
 * Catch error
 * @param error {Error} error object
 * @param params {Object} optional params object
 */
katch.error = (error, params = {}) => {
    let logObj = {
        time: Helpers.getLocaleISODate(),
        type: 'ERROR',
        hash: sha256(error.stack),
        message: error.stack,
        params: params
    };
    Events.fire('error', error, params);
    Events.fire(`type${error.name}`, error, params);

    Log.write(logObj, katch.config);
};

/**
 * Catch error
 * @param error {Error} error object
 * @param params {Object} optional params object
 */
katch.captureError = katch.error;

/**
 * Log info
 * @param message {String} error object
 * @param params {Object} optional params object
 */
katch.info = (message, params = {}) => {
    let logObj = {
        time: Helpers.getLocaleISODate(),
        type: 'INFO',
        hash: sha256(message),
        message: message,
        params: params,
        objectType: null
    };
    Events.fire('info', message, params);

    Log.write(logObj, katch.config);
};

/**
 * Wrapper function
 * @type {function(*, *=)}
 */
katch.wrap = ((func, params = {}) => {
   try {
       func();
   } catch (e) {
       katch.captureError(e, params);
   }
});

/**
 * Call events
 * @param event {String} event name
 * @param callback {function} callback function
 */
katch.on = Events.on;

module.exports = katch;