const Log = require('../src/log');
const Helpers = require('../src/helpers');
const fs = require('fs');
const assert = require('assert');

describe('log', function() {
    it('should have created a log file', ()=>{
        let prefix = 'test-';
        let filename = prefix+Helpers.getLocaleISODate('date')+'.log';
        let folderPath = './test/textures/logs/';
        let fullPath = folderPath+filename;
        if(fs.existsSync(fullPath))
            fs.unlinkSync(fullPath);

        Log.write({
            level: 'TEST',
            code: 12345,
            message: 'hello world',
            params: {}
        }, {
            logging: true,
            writeFile: {
                prefix: prefix,
                folderPath: folderPath
            }
        });

        let content = fs.readFileSync(fullPath);
        let obj = JSON.parse(content.toString());
        assert.equal(obj.level, 'TEST');
    });
});