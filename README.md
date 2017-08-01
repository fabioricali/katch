# katch
Simple module that capture errors and log it. Works both server and browser.

## Installation

### Node.js
```
npm install katch --save
```

Add in top of your entry point app

## Example
```javascript
require('katch')();
// others modules
```

### Browser

Add before others script

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

### Options
```javascript
const katch = require('katch');

const opt = {
    // works only in server environment, in browser store to localStorage
    writeFile: {
        folderPath: './errors'
    }
};

katch(opt);

// events

katch.on('error', (error, params) => {
    console.log(error, params)
});

```