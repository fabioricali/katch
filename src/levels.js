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