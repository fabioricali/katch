const fs = require('fs');
const Helpers = require('./helpers');
const Events = require('./events');

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
    Events.fire(`type${err.name}`, err);

    Events.fire('beforeLog', err);

    let folderPath = catchy.opts.writeFile.folderPath;
    let filename = (new Date()).toLocaleDateString();
    let content = `${(new Date()).toLocaleString()} ${err.stack}\n---------------------------------------------\n`;

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