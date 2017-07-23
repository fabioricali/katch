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

module.exports = Helpers;