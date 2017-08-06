// [AIV]  katch Build version: 1.0.1  
 var katch =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var dateformat = __webpack_require__(7);
var Helpers = {};

/**
 * Set default value
 * @param opts {object} options
 * @param defaultOpts {object} default options
 * @returns {*}
 */
Helpers.defaults = function (opts, defaultOpts) {
    for (var i in defaultOpts) {
        if (defaultOpts.hasOwnProperty(i)) if (!opts.hasOwnProperty(i)) {
            opts[i] = defaultOpts[i];
        } else {
            if (_typeof(opts[i]) === 'object') {
                Helpers.defaults(opts[i], defaultOpts[i]);
            }
        }
    }
    return opts;
};

/**
 * Get locale date string
 * @param part {string} can be all, date, time
 * @returns {*}
 */
Helpers.getLocaleISODate = function () {
    var part = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

    var now = new Date();
    if (part === 'date') return dateformat(now, 'yyyy-mm-dd');else if (part === 'time') return dateformat(now, 'HH:MM:ss');else return dateformat(now, 'yyyy-mm-dd HH:MM:ss');
};

/**
 * Check if browser environment
 * @returns {boolean}
 */
Helpers.isBrowser = function () {
    return typeof window !== 'undefined';
};

module.exports = Helpers;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Events = {};
Events.events = [];

/**
 * Call events
 * @param event {string} event name
 * @param callback {function} callback function
 */
Events.on = function (event, callback) {
    Events.events.push(event, callback);
};

/**
 * Fire event
 * @param args {*}
 */
Events.fire = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    // `arguments` is an object, not array, in FF, so:
    var _args = [];
    for (var i = 0; i < args.length; i++) {
        _args.push(args[i]);
    } // Find event listeners, and support pseudo-event `catchAll`
    var event = _args[0];
    for (var j = 0; j <= Events.events.length; j += 2) {
        if (Events.events[j] === event) Events.events[j + 1].apply(Events, _args.slice(1));
        if (Events.events[j] === 'catchAll') Events.events[j + 1].apply(null, _args);
    }
};

module.exports = Events;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(13);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(6);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Helpers = __webpack_require__(1);
var Log = __webpack_require__(8);
var levels = __webpack_require__(10);
var Events = __webpack_require__(2);
var Trace = __webpack_require__(11);

/**
 * Default options
 * @ignore
 */
var defaultConfig = {
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
        };
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
katch.log = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    katch.log.info.apply(katch, args);
};

/**
 * Create level from levels object*
 * @function createLevel
 * @ignore
 */
function createLevel() {
    var _loop = function _loop(level) {
        if (level === 'ERROR' || level === 'TRACE') return 'continue';
        var methodName = level.toLowerCase();
        katch.log[methodName] = function (message) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


            Events.fire(methodName, message, params);

            if (katch.config.console) console[levels[level].console](message);

            Log.write({
                level: level,
                code: levels[level].code,
                message: message,
                params: params
            }, katch.config);
        };
    };

    for (var level in levels) {
        var _ret = _loop(level);

        if (_ret === 'continue') continue;
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
katch.addLevel = function (level, code) {
    var consoleType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'log';


    if (typeof consoleType !== 'string' || ['log', 'error', 'warn', 'info', 'trace'].indexOf(consoleType) === -1) throw new Error('consoleType is required and must be one of these: error, warn, log, trace or info');

    if (typeof level !== 'string') throw new Error('level name is required and must be a string');

    if (typeof code !== 'number') throw new Error('level code is required and must be a number');

    for (var i in levels) {
        if (i === level.toUpperCase()) throw new Error('level name already exists');
        if (levels[i].code === code) throw new Error('level code already exists');
    }

    for (var _i in katch.log) {
        if (_i === level) throw new Error('level name not allowed');
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
katch.removeLevel = function (level) {
    for (var i in levels) {
        if (levels[i].system && i === level) throw new Error('cannot remove a default level');
    }

    for (var _i2 in katch.log) {
        if (_i2 === level && !levels[level]) throw new Error('level name not allowed');
    }

    if (typeof levels[level] === 'undefined') throw new Error('level not found');

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
katch.getLevels = function () {
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
katch.setup = function (opts) {
    if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) === 'object') {
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
katch.log.error = function (error) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    /**
     * Throw error
     * @fires on#error
     */
    Events.fire('error', error, params);
    Events.fire('type' + error.name, error, params);

    if (katch.config.console) console.error(error);

    Log.write({
        level: 'ERROR',
        code: levels.ERROR.code,
        message: error.stack,
        params: params
    }, katch.config);
};

/**
 * Catch trace
 * @memberOf katch.log
 * @function error
 * @param message {string} message
 * @param params {object} optional params object
 */
katch.log.trace = function (message) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var trace = new Trace(message);

    /**
     * Throw trace
     * @fires on#trace
     */
    Events.fire('trace', trace, params);

    if (katch.config.console) console.trace(trace);

    Log.write({
        level: 'TRACE',
        code: levels.TRACE.code,
        message: trace.stack,
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
 * Trace event.
 *
 * @event on#trace
 * @property {object} stack object.
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
katch.wrap = function (func) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    try {
        func();
    } catch (e) {
        katch.captureError(e, params);
    }
};

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
katch.from.koa = __webpack_require__(12);

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
katch.from.express = __webpack_require__(15);

module.exports = katch;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

(function (global) {
  'use strict';

  var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g;
    var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
    var timezoneClip = /[^-+\dA-Z]/g;

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc, gmt) {

      // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
      if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
        mask = date;
        date = undefined;
      }

      date = date || new Date();

      if (!(date instanceof Date)) {
        date = new Date(date);
      }

      if (isNaN(date)) {
        throw TypeError('Invalid date');
      }

      mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);

      // Allow setting the utc/gmt argument via the mask
      var maskSlice = mask.slice(0, 4);
      if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
        mask = mask.slice(4);
        utc = true;
        if (maskSlice === 'GMT:') {
          gmt = true;
        }
      }

      var _ = utc ? 'getUTC' : 'get';
      var d = date[_ + 'Date']();
      var D = date[_ + 'Day']();
      var m = date[_ + 'Month']();
      var y = date[_ + 'FullYear']();
      var H = date[_ + 'Hours']();
      var M = date[_ + 'Minutes']();
      var s = date[_ + 'Seconds']();
      var L = date[_ + 'Milliseconds']();
      var o = utc ? 0 : date.getTimezoneOffset();
      var W = getWeek(date);
      var N = getDayOfWeek(date);
      var flags = {
        d: d,
        dd: pad(d),
        ddd: dateFormat.i18n.dayNames[D],
        dddd: dateFormat.i18n.dayNames[D + 7],
        m: m + 1,
        mm: pad(m + 1),
        mmm: dateFormat.i18n.monthNames[m],
        mmmm: dateFormat.i18n.monthNames[m + 12],
        yy: String(y).slice(2),
        yyyy: y,
        h: H % 12 || 12,
        hh: pad(H % 12 || 12),
        H: H,
        HH: pad(H),
        M: M,
        MM: pad(M),
        s: s,
        ss: pad(s),
        l: pad(L, 3),
        L: pad(Math.round(L / 10)),
        t: H < 12 ? 'a' : 'p',
        tt: H < 12 ? 'am' : 'pm',
        T: H < 12 ? 'A' : 'P',
        TT: H < 12 ? 'AM' : 'PM',
        Z: gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
        o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
        W: W,
        N: N
      };

      return mask.replace(token, function (match) {
        if (match in flags) {
          return flags[match];
        }
        return match.slice(1, match.length - 1);
      });
    };
  }();

  dateFormat.masks = {
    'default': 'ddd mmm dd yyyy HH:MM:ss',
    'shortDate': 'm/d/yy',
    'mediumDate': 'mmm d, yyyy',
    'longDate': 'mmmm d, yyyy',
    'fullDate': 'dddd, mmmm d, yyyy',
    'shortTime': 'h:MM TT',
    'mediumTime': 'h:MM:ss TT',
    'longTime': 'h:MM:ss TT Z',
    'isoDate': 'yyyy-mm-dd',
    'isoTime': 'HH:MM:ss',
    'isoDateTime': 'yyyy-mm-dd\'T\'HH:MM:sso',
    'isoUtcDateTime': 'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
    'expiresHeaderFormat': 'ddd, dd mmm yyyy HH:MM:ss Z'
  };

  // Internationalization strings
  dateFormat.i18n = {
    dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  function pad(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
      val = '0' + val;
    }
    return val;
  }

  /**
   * Get the ISO 8601 week number
   * Based on comments from
   * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
   *
   * @param  {Object} `date`
   * @return {Number}
   */
  function getWeek(date) {
    // Remove time components of date
    var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Change date to Thursday same week
    targetThursday.setDate(targetThursday.getDate() - (targetThursday.getDay() + 6) % 7 + 3);

    // Take January 4th as it is always in week 1 (see ISO 8601)
    var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

    // Change date to Thursday same week
    firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);

    // Check if daylight-saving-time-switch occured and correct for it
    var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
    targetThursday.setHours(targetThursday.getHours() - ds);

    // Number of weeks between target Thursday and first Thursday
    var weekDiff = (targetThursday - firstThursday) / (86400000 * 7);
    return 1 + Math.floor(weekDiff);
  }

  /**
   * Get ISO-8601 numeric representation of the day of the week
   * 1 (for Monday) through 7 (for Sunday)
   * 
   * @param  {Object} `date`
   * @return {Number}
   */
  function getDayOfWeek(date) {
    var dow = date.getDay();
    if (dow === 0) {
      dow = 7;
    }
    return dow;
  }

  /**
   * kind-of shortcut
   * @param  {*} val
   * @return {String}
   */
  function kindOf(val) {
    if (val === null) {
      return 'null';
    }

    if (val === undefined) {
      return 'undefined';
    }

    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== 'object') {
      return typeof val === 'undefined' ? 'undefined' : _typeof(val);
    }

    if (Array.isArray(val)) {
      return 'array';
    }

    return {}.toString.call(val).slice(8, -1).toLowerCase();
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return dateFormat;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = dateFormat;
  } else {
    global.dateFormat = dateFormat;
  }
})(undefined);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var Helpers = __webpack_require__(1);
var Events = __webpack_require__(2);
var sha256 = __webpack_require__(9);
var fs = __webpack_require__(3);
var os = __webpack_require__(3);
var Log = {};

/**
 * Write log
 * @param logObj
 * @param config
 */
Log.write = function (logObj, config) {

    // Add time and hash to log object
    logObj.time = Helpers.getLocaleISODate();
    logObj.hash = sha256(logObj.message);

    if (Helpers.isBrowser()) {

        logObj.useragent = navigator.userAgent;
        if (config.logging) {
            var logName = 'katch';
            var logDayKey = Helpers.getLocaleISODate('date');
            var logAtDay = JSON.parse(localStorage.getItem(logName)) || {};

            if (!logAtDay[logDayKey]) logAtDay[logDayKey] = [];

            logAtDay[logDayKey].push(logObj);

            try {
                localStorage.setItem(logName, JSON.stringify(logAtDay));
            } catch (e) {
                localStorage.clear();
                localStorage.setItem(logName, JSON.stringify(logAtDay));
            }
        }
    } else {

        var filename = Helpers.getLocaleISODate('date') + '.log';
        var folderPath = config.writeFile.folderPath;
        var fileContent = '';
        var prefix = config.writeFile.prefix;

        logObj.host = os.hostname();
        logObj.pid = process.pid;
        logObj.platform = process.platform;

        if (config.logging) {
            if (config.writeFile.humanize) {
                var separator = '------------------------------------------------------------------------------------';
                fileContent = '[' + logObj.time + '] [' + logObj.level + '] [' + logObj.code + '] [' + logObj.host + '] [' + logObj.hash + '] \n' + logObj.message + '\n' + separator + '\n';
            } else {
                fileContent = JSON.stringify(logObj) + '\n';
            }
            /*
            If writeFile is falsy do not write
             */
            if (config.writeFile) {
                if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
                fs.appendFileSync(folderPath + '/' + prefix + filename, fileContent);
            }
        }
    }

    Events.fire('log', logObj);
};

module.exports = Log;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * SHA256
 * @param s
 * @constructor
 * @returns {string}
 */
function SHA256(s) {
    var chrsz = 8;
    var hexcase = 0;
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 0xFFFF;
    }

    /**
     *
     * @param X
     * @param n
     * @returns {number}
     * @constructor
     */
    function S(X, n) {
        return X >>> n | X << 32 - n;
    }

    /**
     *
     * @param X
     * @param n
     * @returns {*}
     * @constructor
     */
    function R(X, n) {
        return X >>> n;
    }

    /**
     *
     * @param x
     * @param y
     * @param z
     * @returns {number}
     * @constructor
     */
    function Ch(x, y, z) {
        return x & y ^ ~x & z;
    }

    /**
     *
     * @param x
     * @param y
     * @param z
     * @returns {number}
     * @constructor
     */
    function Maj(x, y, z) {
        return x & y ^ x & z ^ y & z;
    }

    /**
     *
     * @param x
     * @returns {number}
     * @constructor
     */
    function Sigma0256(x) {
        return S(x, 2) ^ S(x, 13) ^ S(x, 22);
    }

    /**
     *
     * @param x
     * @returns {number}
     * @constructor
     */
    function Sigma1256(x) {
        return S(x, 6) ^ S(x, 11) ^ S(x, 25);
    }

    /**
     *
     * @param x
     * @returns {number}
     * @constructor
     */
    function Gamma0256(x) {
        return S(x, 7) ^ S(x, 18) ^ R(x, 3);
    }

    /**
     *
     * @param x
     * @returns {number}
     * @constructor
     */
    function Gamma1256(x) {
        return S(x, 17) ^ S(x, 19) ^ R(x, 10);
    }

    /**
     *
     * @param m
     * @param l
     * @returns {[number,number,number,number,number,number,number,number]}
     */
    function core_sha256(m, l) {
        var K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2];
        var HASH = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19];
        var W = new Array(64);
        var a = void 0,
            b = void 0,
            c = void 0,
            d = void 0,
            e = void 0,
            f = void 0,
            g = void 0,
            h = void 0;
        var T1 = void 0,
            T2 = void 0;
        m[l >> 5] |= 0x80 << 24 - l % 32;
        m[(l + 64 >> 9 << 4) + 15] = l;
        for (var i = 0; i < m.length; i += 16) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];
            for (var j = 0; j < 64; j++) {
                if (j < 16) W[j] = m[j + i];else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }
            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }

    /**
     *
     * @param str
     * @returns {Array}
     */
    function str2binb(str) {
        var bin = [];
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << 24 - i % 32;
        }
        return bin;
    }

    /**
     * Encode string to UTF8
     * @param string
     * @returns {string}
     * @constructor
     */
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode(c >> 6 | 192);
                utftext += String.fromCharCode(c & 63 | 128);
            } else {
                utftext += String.fromCharCode(c >> 12 | 224);
                utftext += String.fromCharCode(c >> 6 & 63 | 128);
                utftext += String.fromCharCode(c & 63 | 128);
            }
        }
        return utftext;
    }

    /**
     *
     * @param binarray
     * @returns {string}
     */
    function binb2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 & 0xF);
        }
        return str;
    }
    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}

module.exports = SHA256;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Levels
 * @type {{FATAL: {code: number, system: boolean, error: boolean}, ERROR: {code: number, system: boolean, error: boolean}, WARN: {code: number, system: boolean, error: boolean}, INFO: {code: number, system: boolean, error: boolean}, DEBUG: {code: number, system: boolean, error: boolean}, TRACE: {code: number, system: boolean, error: boolean}}}
 */
module.exports = {
    FATAL: {
        code: 101,
        system: true,
        console: 'error'
    },
    ERROR: {
        code: 102,
        system: true,
        console: 'error'
    },
    WARN: {
        code: 103,
        system: true,
        console: 'warn'
    },
    INFO: {
        code: 104,
        system: true,
        console: 'info'
    },
    DEBUG: {
        code: 105,
        system: true,
        console: 'log'
    },
    TRACE: {
        code: 106,
        system: true,
        console: 'trace'
    }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExtendableError = function (_Error) {
    _inherits(ExtendableError, _Error);

    function ExtendableError() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        _classCallCheck(this, ExtendableError);

        // extending Error is weird and does not propagate `message`
        var _this = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this, message));

        Object.defineProperty(_this, 'message', {
            configurable: true,
            enumerable: false,
            value: message,
            writable: true
        });

        Object.defineProperty(_this, 'name', {
            configurable: true,
            enumerable: false,
            value: _this.constructor.name,
            writable: true
        });

        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(_this, _this.constructor);
            return _possibleConstructorReturn(_this);
        }

        Object.defineProperty(_this, 'stack', {
            configurable: true,
            enumerable: false,
            value: new Error(message).stack,
            writable: true
        });
        return _this;
    }

    return ExtendableError;
}(Error);

var Trace = function (_ExtendableError) {
    _inherits(Trace, _ExtendableError);

    function Trace() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Trace';

        _classCallCheck(this, Trace);

        return _possibleConstructorReturn(this, (Trace.__proto__ || Object.getPrototypeOf(Trace)).call(this, message));
    }

    return Trace;
}(ExtendableError);

module.exports = Trace;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

/**
 * Catch error from Koa app
 * @param app {Object} koa app
 */
module.exports = function (app) {
    app.on('error', function (error) {
        setImmediate(function () {
            throw error;
        });
    });
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).setImmediate))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
        // Callback can either be a function or a string
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        // Copy function arguments
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        // Store and register the task
        var task = { callback: callback, args: args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function registerImmediate(handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function registerImmediate(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function registerImmediate(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function registerImmediate(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function registerImmediate(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

/**
 * Catch error middleware
 * @param err {Error}
 * @param req {Object}
 * @param res {Object}
 * @param next {Function)
 */
module.exports = function (err, req, res, next) {
  setImmediate(function () {
    throw err;
  });
  next();
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).setImmediate))

/***/ })
/******/ ]); 