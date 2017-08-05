const Koa = require('koa');
const request = require('request');

process.removeAllListeners('uncaughtException');
process.setMaxListeners(0);

global.katch = require('../');

katch.on('error', err => {
    console.log('katch error');
    console.log(err.message);
    console.log(err.stack);
});

katch.on('log', obj => {
    console.log('log event');
    console.log(obj);
});

describe('katch koa', function() {

    this.timeout(2000);

    let listeners;
    let port = 4000;
    let host = 'http://localhost:'+port;

    if (typeof process === 'object') {
        beforeEach(() => {
            listeners = process.listeners('uncaughtException');
            process.removeAllListeners('uncaughtException');

            katch({
                writeFile: {
                    folderPath: './test/textures/logs/koa'
                }
            });

        });

        afterEach(() => {
            listeners.forEach(function (listener) {
                process.on('uncaughtException', listener);
            });
        });
    }

    it('typeError', done => {

        katch.on('typeError', (error) => {
            if(error.message === 'koa error')
                done();
        });

        const app = new Koa();

        katch.koa(app);
        // response
        app.use(ctx => {
            throw new Error('koa error');
        });

        app.listen(port);
        request(host);

    });

});