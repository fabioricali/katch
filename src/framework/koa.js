/**
 * Catch error from Koa app
 * @param app {Object} koa app
 */
function koa(app) {
    app.on('error', error => {
        setImmediate(() => {
            throw error;
        })
    })
}

module.exports = koa;
