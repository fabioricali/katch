const Koa = require('koa');
const request = require('request');
global.app = new Koa();

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

    this.timeout(5000);

    let listeners;
    let port = 3000;
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

    it('typeReferenceError', done => {

        katch.on('typeReferenceError', () => {
            done();
        });

        katch.koa(app);
        // response
        app.use(ctx => {
            ctx2.body = 'Hello Koa';
        });

        app.listen(port);
        request(host);

    });

});