const dateformat = require('dateformat');
const Helpers = {};

/**
 * Set default value
 * @param opts {object} options
 * @param defaultOpts {object} default options
 * @returns {*}
 */
Helpers.defaults = (opts, defaultOpts) => {
    for (let i in defaultOpts) {
        if(defaultOpts.hasOwnProperty(i))
            if (!opts.hasOwnProperty(i)) {
                opts[i] = defaultOpts[i];
            } else {
                if (typeof opts[i] === 'object') {
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
Helpers.getLocaleISODate = (part = 'all') => {
    const now = new Date();
    if(part === 'date')
        return dateformat(now, 'yyyy-mm-dd');
    else if(part === 'time')
        return dateformat(now, 'HH:MM:ss');
    else
        return dateformat(now, 'yyyy-mm-dd HH:MM:ss');
};

/**
 * Check if browser environment
 * @returns {boolean}
 */
Helpers.isBrowser = () => {
    return typeof window !== 'undefined';
};

module.exports = Helpers;