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

describe('katch express', function() {

    this.timeout(2000);

    let listeners;
    let port = 3000;
    let host = 'http://localhost:'+port;

    if (typeof process === 'object') {
        beforeEach(() => {
            listeners = process.listeners('uncaughtException');
            process.removeAllListeners('uncaughtException');

            katch({
                writeFile: {
                    folderPath: './test/textures/logs/express'
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
            console.log(error.message);
            if(error.message === 'express error')
                done();
        });

        const app = require('express')();

        // response
        app.get('/', (req, res) => {
            console.log(req);
            throw new Error('express error');
        });

        app.use(katch.from.express);

        app.listen(port);
        request(host);

    });

});