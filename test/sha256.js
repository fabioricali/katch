const sha256 = require('../src/lib/sha256');
const be = require('bejs');

describe('sha256', () => {
    it('should return true', () => {
        be.err.sha256(sha256('hello'));
    });
});