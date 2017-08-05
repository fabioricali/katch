/**
 * Catch error from Koa app
 * @param app {Object} koa app
 */
module.exports = (app) => {
    app.on('error', error => {
        setImmediate(() => {
            throw error;
        })
    })
};
