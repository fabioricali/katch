let Helpers = {};

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
    function pad(n) {
        if(n < 10)
            return `0${n}`;
        else
            return n;
    }

    let d = (new Date()).toLocaleString('ISO').split(' ');

    let time = d[1];
    let date = d[0].split('-');
    let Y = date[0];
    let M = pad(date[1]);
    let D = pad(date[2]);
    date = Y + '-' + M + '-' + D;

    if(part === 'date')
        return date;
    else if(part === 'time')
        return time;
    else
        return `${date} ${time}`;
};

/**
 * Check if server environment
 * @returns {boolean}
 */
Helpers.isCommonjsEnv = () => {
    return typeof process !== 'undefined';
};

/**
 * Check if browser environment
 * @returns {boolean}
 */
Helpers.isBrowserEnv = () => {
    return typeof window !== 'undefined';
};

module.exports = Helpers;