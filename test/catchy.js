const assert = require('assert');
process.removeAllListeners('uncaughtException');

const catchy = require('../index');

catchy.on('error', err => {
    console.log('Catchy error');
    console.log(err.message);
    console.log(err.stack);
});

describe('catchy', () =>{
    let listeners ;

    beforeEach(() => {
        listeners = process.listeners('uncaughtException');
        process.removeAllListeners('uncaughtException');

        catchy({
            writeFile: {
                folderPath: './test/textures/errors'
            }
        });

    });

    afterEach(() => {
        listeners.forEach(function(listener) {
            process.on('uncaughtException', listener);
        });
    });

    it('Error', done => {

        catchy.on('typeError', () => {
            done();
        });

        setImmediate(()=>{
            throw new Error('MyError');
        });

    });

    it('RangeError', done => {

        catchy.on('typeRangeError', () => {
            done();
        });

        setImmediate(()=>{
            throw new RangeError('MyRangeError');
        });

    });

    it('TypeError', done => {

        catchy.on('typeTypeError', () => {
            done();
        });

        setImmediate(()=>{
            throw new TypeError('MyTypeError');
        });

    });

    it('ReferenceError', done => {

        catchy.on('typeReferenceError', (err) => {
            if(err.message === 'MyReferenceError')
            done();
        });

        setImmediate(()=>{
            throw new ReferenceError('MyReferenceError');
        });

    });

    it('SyntaxError', done => {

        catchy.on('typeSyntaxError', () => {
            done();
        });

        setImmediate(()=>{
            throw new SyntaxError('MySyntaxError');
        });

    });

    it('EvalError', done => {

        catchy.on('typeEvalError', () => {
            done();
        });

        setImmediate(()=>{
            throw new EvalError('MyEvalError');
        });

    });

    it('URIError', done => {

        catchy.on('typeURIError', () => {
            done();
        });

        setImmediate(()=>{
            throw new URIError('MyURIError');
        });

    });

    it('func is not defined', done => {

        catchy.on('typeReferenceError', (err) => {
            if(err.message === 'func is not defined')
                done();
        });

        setImmediate(()=>{
            new func();
        });
    });
});