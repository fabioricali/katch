# katch
Simple module that capture errors and log it. Works both server and browser.

## Installation

### Node.js
```
npm install katch --save
```

Add in top of your entry point app

## Basic usage
```javascript
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

### Configuration
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

katch.config = {
    writeFile: false
};

try {
    foo();
    bar();
} catch (e) {
    katch.captureError(e, {
        customParam: 'hello horror'
    });
}

//... or use wrap method

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

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/katch/blob/master/CHANGELOG.md">here</a>

## License
beJS is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>
