if (typeof process === 'object') {
    const assert = require('assert');
    process.removeAllListeners('uncaughtException');
    process.setMaxListeners(0);

    global.katch = require('../index');

    katch.on('error', err => {
        console.log('katch error');
        console.log(err.message);
        console.log(err.stack);
    });
}

describe('katch', () => {

    let listeners;
    if (typeof process === 'object') {
        beforeEach(() => {
            listeners = process.listeners('uncaughtException');
            process.removeAllListeners('uncaughtException');

            katch({
                writeFile: {
                    folderPath: './test/textures/logs'
                }
            });

        });

        afterEach(() => {
            listeners.forEach(function (listener) {
                process.on('uncaughtException', listener);
            });
        });
    }

    it('Error', done => {

        katch.on('typeError', () => {
            done();
        });

        setImmediate(() => {
            throw new Error('MyError');
        });

    });

    it('RangeError', done => {

        katch.on('typeRangeError', () => {
            done();
        });

        setImmediate(() => {
            throw new RangeError('MyRangeError');
        });

    });

    it('TypeError', done => {

        katch.on('typeTypeError', () => {
            done();
        });

        setImmediate(() => {
            throw new TypeError('MyTypeError');
        });

    });

    it('ReferenceError', done => {

        katch.on('typeReferenceError', (err) => {
            if (err.message === 'MyReferenceError')
                done();
        });

        setImmediate(() => {
            throw new ReferenceError('MyReferenceError');
        });

    });

    it('SyntaxError', done => {

        katch.on('typeSyntaxError', () => {
            done();
        });

        setImmediate(() => {
            throw new SyntaxError('MySyntaxError');
        });

    });

    it('EvalError', done => {

        katch.on('typeEvalError', () => {
            done();
        });

        setImmediate(() => {
            throw new EvalError('MyEvalError');
        });

    });

    it('URIError', done => {

        katch.on('typeURIError', () => {
            done();
        });

        setImmediate(() => {
            throw new URIError('MyURIError');
        });

    });

    it('func is not defined', done => {

        katch.on('typeReferenceError', (err) => {
            if (err.message === 'func is not defined')
                done();
        });

        setImmediate(() => {
            new func();
        });
    });

    it('katch.captureError', done => {

        katch.on('typeReferenceError', (err) => {
            if (err.message === 'capture error 1')
                done();
        });

        katch.captureError(new ReferenceError('capture error 1'));
    });

    it('katch.captureError without write file error', done => {

        katch.on('typeReferenceError', (err) => {
            if (err.message === 'capture error 2')
                done();
        });

        katch.setup({
            writeFile: false
        });

        katch.captureError(new ReferenceError('capture error 2'));
    });

    it('katch.error alias of captureError', done => {

        katch.on('typeReferenceError', (err) => {
            if (err.message === 'capture error 3')
                done();
        });

        katch.error(new ReferenceError('capture error 3'));
    });

    it('katch.wrap', done => {

        katch.on('typeReferenceError', (err) => {
            if (err.message === 'func2 is not defined') {
                done();
            }
        });

        katch.wrap(() => {
            func2();
        });
    });

    it('katch.wrap with params', done => {

        katch.on('typeReferenceError', (err, params) => {
            if (err.message === 'func3 is not defined') {
                console.log(params);
                done();
            }
        });

        katch.wrap(() => {
            func3();
        }, {
            custom: 'horror'
        });
    });

    it('write log json', done => {

        katch.on('typeReferenceError', (err, params) => {
            if (err.message === 'func4 is not defined') {
                console.log(params);
                done();
            }
        });

        katch.setup({
            writeFile: {
                prefix: 'json-',
                humanize: false,
                folderPath: './test/textures/logs'
            }
        });

        console.log(katch.config);

        katch.wrap(() => {
            func4();
        }, {
            custom: 'horror'
        });
    });

    it('append info to log', done => {

        katch.on('info', (message, params) => {
            if (message === 'hello world') {
                console.log(params);
                done();
            }
        });

        katch.info('hello world', {foo: 'bar'});
    });
});