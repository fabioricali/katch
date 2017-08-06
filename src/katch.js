const Helpers = require('./helpers');
const Log = require('./log');
const levels = require('./levels');
const Events = require('./events');

/**
 * Default options
 * @ignore
 */
const defaultConfig = {
    console: true,
    logging: true,
    writeFile: {
        prefix: '',
        humanize: true,
        folderPath: './logs'
    }
};

/**
 * katch
 * @namespace
 * @see https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
 * @param opts {object} options object
 * @example
 * const katch = require('katch');
 * katch(config);
 * katch.on(error, error => {});
 */
function katch(opts) {

    katch.setup(opts);

    if (Helpers.isBrowser()) {
        window.onerror = function (msg, url, lineNo, columnNo, error) {
            katch.log.error(error, {
                message: msg,
                url: url,
                lineNo: lineNo,
                columnNo: columnNo
            });
        }
    } else {
        process.on('uncaughtException', katch.log.error);
    }

    return katch;
}

/**
 * Config params
 * @type {{}}
 */
katch.config = defaultConfig;

/**
 * @namespace katch.log
 */
katch.log = (...args) => {
    katch.log.info.apply(katch, args);
};

/**
 * Create level from levels object*
 * @function createLevel
 * @ignore
 */
function createLevel() {
    for (let level in levels) {
        if (level === 'ERROR') continue;
        let methodName = level.toLowerCase();
        katch.log[methodName] = (message, params = {}) => {

            Events.fire(methodName, message, params);

            if (katch.config.console)
                console[levels[level].console](message);

            Log.write({
                level: level,
                code: levels[level].code,
                message: message,
                params: params
            }, katch.config);
        }
    }
}

/**
 * Run create level
 */
createLevel();

/**
 * Add custom level
 * @memberOf katch
 * @function addLevel
 * @param level {string} level name
 * @param code {number} level code
 * @param [consoleType=log] {string} console type can be error, warn, log, trace, info
 * @example
 * katch.addLevel('MYLEVEL', 123);
 */
katch.addLevel = (level, code, consoleType = 'log') => {

    if(typeof consoleType !== 'string' || ['log','error','warn','info','trace'].indexOf(consoleType) === -1 )
        throw new Error('consoleType is required and must be one of these: error, warn, log, trace or info');

    if(typeof level !== 'string')
        throw new Error('level name is required and must be a string');

    if(typeof code !== 'number')
        throw new Error('level code is required and must be a number');

    for(let i in levels) {
        if(i === level.toUpperCase())
            throw new Error('level name already exists');
        if(levels[i].code === code)
            throw new Error('level code already exists');
    }

    for(let i in katch.log) {
        if(i === level)
            throw new Error('level name not allowed');
    }

    levels[level] = {
        code: code,
        system: false,
        console: consoleType
    };

    // recreate level
    createLevel();
};

/**
 * Remove custom level
 * @memberOf katch
 * @function removeLevel
 * @param level {string} level name
 * @example
 * katch.removeLevel('MYLEVEL');
 */
katch.removeLevel = (level) => {
    for(let i in levels) {
        if(levels[i].system && i === level)
            throw new Error('cannot remove a default level');
    }

    for(let i in katch.log) {
        if(i === level && !levels[level])
            throw new Error('level name not allowed');
    }

    if(typeof levels[level] === 'undefined')
        throw new Error('level not found');

    delete levels[level];

    // recreate level
    createLevel();
};

/**
 * Return all levels definitions
 * @memberOf katch
 * @function getLevels
 * @returns {{FATAL: {code: number, system: boolean, error: boolean}, ERROR: {code: number, system: boolean, error: boolean}, WARN: {code: number, system: boolean, error: boolean}, INFO: {code: number, system: boolean, error: boolean}, DEBUG: {code: number, system: boolean, error: boolean}, TRACE: {code: number, system: boolean, error: boolean}}}
 */
katch.getLevels = ()=> {
    return levels;
};

/**
 * Set config
 * @memberOf katch
 * @function setup
 * @param opts {object} configuration options
 * @example
 * katch.setup({
 *   console: true,
 *   logging: true,
 *   writeFile: {
 *       prefix: '',
 *       humanize: true,
 *       folderPath: './logs'
 * });
 */
katch.setup = (opts) => {
    if (typeof opts === 'object') {
        katch.config = Helpers.defaults(opts, defaultConfig);
    }
};

/**
 * Catch error
 * @memberOf katch.log
 * @function error
 * @param error {Error} error object
 * @param params {object} optional params object
 */
katch.log.error = (error, params = {}) => {
    /**
     * Throw error
     * @fires on#error
     */
    Events.fire('error', error, params);
    Events.fire(`type${error.name}`, error, params);

    if (katch.config.console)
        console.error(error);

    Log.write({
        level: 'ERROR',
        code: levels.ERROR.code,
        message: error.stack,
        params: params
    }, katch.config);
};

/**
 * Catch error, alias of katch.log.error
 * @memberOf katch
 * @function captureError
 * @param error {Error} error object
 * @param params {object} optional params object
 */
katch.captureError = katch.log.error;

/**
 * Error event.
 *
 * @event on#error
 * @property {Error} error - object error.
 * @property {object} optional params object.
 */

/**
 * Info event.
 *
 * @event on#info
 * @property {string} message.
 * @property {object} optional params object.
 */

/**
 * Warn event.
 *
 * @event on#warn
 * @property {string} message.
 * @property {object} optional params object.
 */

/**
 * Debug event.
 *
 * @event on#debug
 * @property {string} message.
 * @property {object} optional params object.
 */

/**
 * Fatal event.
 *
 * @event on#fatal
 * @property {string} message.
 * @property {object} optional params object.
 */

/**
 * Log info
 * @memberOf katch.log
 * @function info
 * @param message {string} error object
 * @param params {object} optional params object
 */

/**
 * Log warn
 * @memberOf katch.log
 * @function warn
 * @param message {string} error object
 * @param params {object} optional params object
 */

/**
 * Log fatal
 * @memberOf katch.log
 * @function fatal
 * @param message {string} error object
 * @param params {object} optional params object
 */

/**
 * Log debug
 * @memberOf katch.log
 * @function debug
 * @param message {string} error object
 * @param params {object} optional params object
 */

/**
 * Wrapper function
 * @memberOf katch
 * @function wrap
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
 * @function on
 * @param event {string} event name
 * @param callback {function} callback function
 */
katch.on = Events.on;

/**
 * @namespace katch.from
 */
katch.from = {};

/**
 * Catch error from Koa app
 * @memberOf katch.from
 * @function koa
 * @example
 * const app = new Koa();
 * katch.from.koa(app);
 */
katch.from.koa = require('./framework/koa');

/**
 * Catch error from Express app
 * @memberOf katch.from
 * @function express
 * @example
 * const app = require('express')();
 * app.get('/', function (req, res) {
 *      res.send('Hello World!');
 * });
 * app.use(katch.from.express);
 */
katch.from.express = require('./framework/express');

module.exports = katch;