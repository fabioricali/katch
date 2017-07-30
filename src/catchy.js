const Helpers = require('./helpers');
const Events = require('./events');
const sha256 = require('./sha256');
const fs = require('fs');

let events = [];
let defaultOpts = {
    writeFile: {
        folderPath: './errors'
    }
};

/**
 * Catchy
 * @param opts {object} options object
 */
function catchy(opts){

    if(typeof opts === 'object') {
        catchy.opts = Helpers.defaults(opts, defaultOpts);
    }

    if(Helpers.isCommonjsEnv()) {
        process.on('uncaughtException', (err) => {
            catchy.captureError(err);
        });
    }else if(Helpers.isBrowserEnv()) {
        //todo see https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
        window.onerror = function (msg, url, lineNo, columnNo, error) {
            catchy.captureError(error);
            return false;
        }
    }else{
        throw new Error('Catchy init error');
    }
}

/**
 * Catch error
 * @param err {error} error object
 */
catchy.captureError = (err) => {
    Events.fire('error', err);
    Events.fire(`type${err.name}`, err);

    Events.fire('beforeLog', err);

    let folderPath = catchy.opts.writeFile.folderPath;
    let filename = Helpers.getLocaleISODate('date');
    let errorStack = err.stack;
    let hash = sha256(errorStack);
    let content = `${Helpers.getLocaleISODate()} ${hash}\n${errorStack}\n------------------------------------------------------------------------------------\n`;

    if(!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath);
    fs.appendFileSync(`${folderPath}/${filename}`, content);

    Events.fire('afterLog', err);
};

/**
 * Call events
 * @param event {string} event name
 * @param callback {function} callback function
 */
catchy.on = Events.on;

module.exports = catchy;