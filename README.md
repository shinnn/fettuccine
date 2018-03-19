# fettuccine

[![npm version](https://img.shields.io/npm/v/fettuccine.svg)](https://www.npmjs.com/package/fettuccine)
[![Build Status](https://travis-ci.org/shinnn/fettuccine.svg?branch=master)](https://travis-ci.org/shinnn/fettuccine)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/fettuccine.svg)](https://coveralls.io/github/shinnn/fettuccine?branch=master)
[![Dependency Status](https://david-dm.org/shinnn/fettuccine.svg)](https://david-dm.org/shinnn/fettuccine)
[![devDependency Status](https://david-dm.org/shinnn/fettuccine/dev-status.svg)](https://david-dm.org/shinnn/fettuccine#info=devDependencies)

A simplified HTTP client for [Node](https://nodejs.org/)

* with the [Promise API](https://promisesaplus.com/)
* and [every imaginable option](https://github.com/request/request#requestoptions-callback) thanks to [Request](https://github.com/request/request),
* nevertheless, keeping [small package size](https://github.com/shinnn/load-request-from-cwd-or-npm#why) by [economical module loading](https://github.com/shinnn/load-request-from-cwd-or-npm)

```javascript
const fettuccine = require('fettuccine');

(async () => {
  const response = await fettuccine('https://api.github.com/users/isaacs/repos', {
    qs: {sort: 'created'},
    json: true
  });

  response.body[0]; //=> {id: 46883374, name: 'pseudomap', ...}
})();
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install fettuccine
```

## API

```javascript
const fettuccine = require('fettuccine');
```

### fettuccine(*url* [, *options*])

*url*: `string` (URL to send a request)  
*options*: `Object` (used as [`Request` options][request] with [`gzip`](https://github.com/request/request/blob/288f814e71efdd70f852888c1701c5cf3d177da5/request.js#L913-L928) defaulting to `true`)  
Return: `Promise<Object>`

It makes an HTTP or HTTPS request to the given URL.

When the request finishes, it will be [*fulfilled*](https://promisesaplus.com/#point-26) with the  [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_http_incomingmessage) object with the additional [`body` property][request]:

> `response` body (`String` or `Buffer`, or JSON object if the `json` option is supplied)

When the request fails, it will be [*rejected*](https://promisesaplus.com/#point-30) with an error object (usually from [`http.ClientRequest`](https://nodejs.org/api/http.html#http_class_http_clientrequest) object).

### fettuccine.get()

Alias of [`fettuccine()`][fettucine].

### fettuccine.post(), fettuccine.put(), fettuccine.patch(), fettuccine.head(), fettuccine.delete()

Set `options.method` to the method name and call [`fettuccine()`][fettucine].

```javascript
const fettuccine = require('fettuccine');

// With `fettuccine()`
(async () => {
  await fettuccine('https://awesome-webservice.com/api', {
    method: 'POST',
    body: imageBuffer
  });

  console.log('Uploaded an image.')
})();

// With `fettuccine.post()`
(async () => {
  await fettuccine.post('https://awesome-webservice.com/api', {
    body: imageBuffer
  });

  console.log('Uploaded an image.')
})();
```

### fettuccine.Fettuccine([*options*])

The [`Fettuccine` class](https://github.com/shinnn/fettuccine-class).

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe

[request]: https://github.com/request/request#requestoptions-callback
[fettucine]: https://github.com/shinnn/fettuccine#fettuccineurl--options
