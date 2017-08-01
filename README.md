# Catchy
Simple module that capture errors and log it. Works both server and browser.

## Installation

### Node.js
```
npm install catchy --save
```

Add in top of your entry point app

## Example
```javascript
require('catchy')();
// others modules
```

### Browser

Add before others script

#### Local
```html
<script src="node_modules/catchy/dist/catchy.min.js"></script>
<script>catchy()</script>
```

#### CDN unpkg
```html
<script src="https://unpkg.com/catchy/dist/catchy.min.js"></script>
<script>catchy()</script>
```

#### CDN jsDeliver
```html
<script src="https://cdn.jsdelivr.net/npm/catchy/dist/catchy.min.js"></script>
<script>catchy()</script>
```

### Options
```javascript
const catchy = require('catchy');

const opt = {
    // works only in server environment, in browser store to localStorage
    writeFile: {
        folderPath: './errors'
    }
};

catchy(opt);

// events

catchy.on('error', (error, params) => {
    console.log(error, params)
});

```