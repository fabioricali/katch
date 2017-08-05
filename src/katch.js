const Helpers = require('./helpers');
const Log = require('./log');
const levels = require('./levels');
const Events = require('./events');

/**
 * Default options
 * @type {{console: boolean, logging: boolean, writeFile: {prefix: string, humanize: boolean, folderPath: string}}}
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
 * Create level from levels object
 * @function createLevel
 * @private
 */
function createLevel() {
    for (let level in levels) {
        if (level === 'ERROR') continue;
        let methodName = level.toLowerCase();
        katch[methodName] = (message, params = {}) => {

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

    for(let i in katch) {
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
 * @param level {string} level name
 * @example
 * katch.removeLevel('MYLEVEL');
 */
katch.removeLevel = (level) => {
    for(let i in levels) {
        if(levels[i].system && i === level)
            throw new Error('cannot remove a default level');
    }

    for(let i in katch) {
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
 * @function getLevels
 * @returns {*}
 */
katch.getLevels = ()=> {
    return levels;
};

/**
 * katch
 * @constructor
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
 *  });
 */
katch.setup = (opts) => {
    if (typeof opts === 'object') {
        katch.config = Helpers.defaults(opts, defaultConfig);
    }
};

/**
 * Catch error
 * @function error
 * @param error {Error} error object
 * @param params {object} optional params object
 */
katch.error = (error, params = {}) => {

    Events.fire('error', error, params);
    Events.fire(`type${error.name}`, error, params);

    if (katch.config.console)
        console.error(error);

    Log.write({
        level: 'ERROR',
        levelCode: levels.ERROR,
        message: error.stack,
        params: params
    }, katch.config);
};

/**
 * Catch error, alias of katch.error
 * @function captureError
 * @param error {Error} error object
 * @param params {object} optional params object
 */
katch.captureError = katch.error;

/**
 * Log info
 * @function info
 * @param message {string} error object
 * @param params {object} optional params object
 */

/**
 * Log warn
 * @function warn
 * @param message {string} error object
 * @param params {object} optional params object
 */

/**
 * Log fatal
 * @function fatal
 * @param message {string} error object
 * @param params {object} optional params object
 */

/**
 * Log debug
 * @function debug
 * @param message {string} error object
 * @param params {object} optional params object
 */

/**
 * Wrapper function
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
 * Catch error from Koa app
 * @function koa
 * @example
 * const app = new Koa();
 * katch.koa(app);
 */
katch.koa = require('./framework/koa');

/**
 * Catch error from Express app
 * @function express
 * @example
 * const app = require('express')();
 * app.get('/', function (req, res) {
 *      res.send('Hello World!');
 * });
 * app.use(katch.express);
 */
katch.express = require('./framework/express');

module.exports = katch;