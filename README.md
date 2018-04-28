# ezzy-package-loader

[![Build Status](https://travis-ci.org/ezzygemini/ezzy-logger.svg?branch=master)](https://travis-ci.org/ezzygemini/ezzy-package-loader)
[![Coverage Status](https://coveralls.io/repos/github/ezzygemini/ezzy-package-loader/badge.svg?branch=master)](https://coveralls.io/github/ezzygemini/ezzy-package-loader?branch=master)


Sometimes we make use of package.json to centralize configurable properties of our app, this becomes a dilemma when importing data from files that are compiled via webpack because our raw source code is left exposed for the whole public to see. This means that if you write code like this:

```javascript
const { version } = require('../package.json');
// or 
export { version } from '../package.json';
```

Most likely you have all the properties of your package.json out there for the whole world to see. This is why I’ve built this package loader, so we can still centralize our configuration and yet, not share our sensitive details to the world. 

All you have to do is install this dependency using 

```bash
npm i -D ezzy-package-loader 
```

And then add a custom loader to your webpack.config.js file.

```javascript
{
  module: {
    rules: [
      {
        test: /package\.json$/,
        type: 'javascript/auto', // important
        use: ['ezzy-package-loader']
      }
    ]
  }
}
```

## Usage

By default, all the properties in a package.json are considered private, so the loader will return an empty object if none of the following options are set.


#### _expose = true

When a property `_expose = true` is set, the loader assumes that everything within the same scope and under it should be exposed to webpack.

So:
```json
{
  "name": "my-package",
  "version": "1.0.0",
  "customConfig": {
    "_expose": true,
    "property": 123,
    "props": {
      "config": {
        "childProp": 345
      }
    }
  }
}
```
Will result in:
```json
{
  "customConfig": {
    "property": 123,
    "props": {
      "config": {
        "childProp": 345
      }
    }
  }
}
```


### _expose = {String[]|String}

This will only expose the named properties in the array. If the property is a string, we don't include it.

So:
```json
{
  "_expose": ["name", "customConfig"],
  "name": "my-package",
  "version": "1.0.0",
  "customConfig": {
    "_expose": ["property"],
    "property": 123,
    "props": {
      "config": {
        "childProp": 345
      }
    }
  }
}
```

Will result in:
```json
{
  "name": "my-package",
  "customConfig": {
    "property": 123
  }
}
```
