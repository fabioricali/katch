const fs = require('fs');
const Helpers = require('./helpers');
const Events = require('./events');

let events = [];
let defaultOpts = {
    writeFile: {
        path: './',
        filename: 'day'
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

    process.on('uncaughtException', (err) => {
        catchy.error(err);
    });
}

/**
 * Catch error
 * @param err {error} error object
 */
catchy.error = (err) => {
    Events.fire('error', err);
    console.log('INTERN');
    console.log(catchy.opts);
    fs.writeFile(catchy.opts.writeFile.path, `Caught exception: ${err}\n`);
};

/**
 * Call events
 * @param event {string} event name
 * @param callback {function} callback function
 */
catchy.on = Events.on;

module.exports = catchy;