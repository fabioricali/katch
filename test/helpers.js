const assert = require('assert');
const Helpers = require('../src/helpers');

describe('helpers', ()=>{
    describe('defaults', ()=>{
        it('should return object', ()=>{
            let opts = {a: 1, c: {z: 2}};
            let defOpts = {a: 0, b: 2, c: {z: 5, w: 8}};
            console.log('opts   ', opts);
            console.log('defOpts', defOpts);
            let result = Helpers.defaults(opts, defOpts);
            console.log('result ', result);

            assert.equal(opts.a, result.a);
            assert.equal(opts.c.z, result.c.z);
            assert.equal(defOpts.c.w, result.c.w);
        });
    });
});
