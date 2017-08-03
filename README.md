<div align="center">

<h1 style="color: red">katch</h1>

Simple module that capture errors and log it. Works both server and browser.

<a href="https://travis-ci.org/fabioricali/katch" target="_blank"><img src="https://travis-ci.org/fabioricali/katch.svg?branch=master" title="Build Status"/></a>
<a href="https://coveralls.io/github/fabioricali/katch?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/fabioricali/katch/badge.svg?branch=master" title="Coverage Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>
<img src="https://img.shields.io/badge/team-terrons-orange.svg" title="Team Terrons"/>
</div>

## Installation

### Node.js
```
npm install katch --save
```

Add in top of your entry point app

## Basic usage
```javascript
// detect automatically all errors
require('katch')();
// others modules
```

### Browser

Add before others scripts

#### Local
```html
<script src="node_modules/katch/dist/katch.min.js"></script>
<script>katch()</script>
```

#### CDN unpkg
```html
<script src="https://unpkg.com/katch/dist/katch.min.js"></script>
<script>katch()</script>
```

#### CDN jsDeliver
```html
<script src="https://cdn.jsdelivr.net/npm/katch/dist/katch.min.js"></script>
<script>katch()</script>
```

### Examples
```javascript
const katch = require('katch');

const config = {
    // works only in server environment, in browser store to localStorage
    writeFile: {
        folderPath: './errors'
    }
};

katch(config);

// events

katch.on('error', (error, params) => {
    console.log(error, params);
});
```

#### Capture manually

```javascript
const katch = require('katch');

katch.setup({
    writeFile: false
});

try {
    foo();
    bar();
} catch (e) {
    katch.error(e, {
        customParam: 'hello horror'
    });
}

//... or using a wrap method

katch.wrap(() => {
    foo();
    bar();
}, {
    customParam: 'hello horror'
});

katch.on('error', (error, params) => {
    console.log(error, params);
});
```

#### Append info to log
```javascript
katch.info('A log message', {custom: 1234});

katch.on('info', (message, params) => {
    console.log(message, params);
});
```

#### Log event

Every invoked

```javascript
katch.on('log', obj => {
    console.log(obj);
    // obj
    { 
        time: '2017-08-02 19:01:46',
        type: 'INFO', // INFO or ERROR
        hash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
        message: 'hello world',
        params: { foo: 'bar' },
        host: 'DEVELOP-STATION', // only server
        pid: 22232, // only server
        platform: 'win32' // only server,
        useragent: '"Mozilla/5.0...' // only browser
     }
     
});
```

### Configuration
```javascript
const config = {
    logging: true, // if false disable writing log. The event "log" will be invoked anyway 
    writeFile: { // only server environment
        prefix: '', // add a prefix to filename
        humanize: true, // write a readable log
        folderPath: './logs' // folder path
    }
}
```

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/katch/blob/master/CHANGELOG.md">here</a>

## License
katch is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>
