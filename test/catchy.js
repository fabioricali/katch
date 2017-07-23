const assert = require('assert');
process.removeAllListeners('uncaughtException');

describe('catchy', () =>{
    let listeners ;

    beforeEach(() => {
        listeners = process.listeners('uncaughtException');
        process.removeAllListeners('uncaughtException');
    });

    afterEach(() => {
        listeners.forEach(function(listener) {
            process.on('uncaughtException', listener);
        });
    });

    it('test', (done) => {

        const catchy = require('../index');

        catchy({
            writeFile: {
                path: './test/textures/errors.err'
            }
        });

        catchy.on('error', (err) => {
            console.log(err);
            assert.equal(true, true);
            done();
        });

        setImmediate(()=>{
            throw new Error('aaaa');
        });

    });
});