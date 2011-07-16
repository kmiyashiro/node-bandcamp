# Bandcamp Library for Node.js #

A simple library to easily interact with the [Bandcamp API](http://bandcamp.com/developer).

[Bandcamp](http://bandcamp.com) is an awesome platform for musicians, both physically large and small. You could be, like, tiny... or HUGE. It doesn't matter how big you are as long as you can use a computer. Just visit Bandcamp to setup your account and start selling music to your fans. It also does not discriminate against large or small fans, you just need a computer to listen to and buy music from Bandcamp. If you're a nerd, you can get uncompressed formats. The musician gets a large cut.

## Installation

```
npm install bandcamp
```

## Usage

```js
var key = 'yourbandcampAPIkey', // contact <support@bandcamp.com> to request one
    bandcamp = require('bandcamp')(key),
    i = require('util').inspect;
    
bandcamp.band.search('the internet', function(err, result, status) {
    console.log(i(JSON.parse(result)));
});
```

See [Bandcamp API Documentation](http://bandcamp.com/developer) for details on all the calls and view `test/test.js` for examples for every method.

## Options

Bandcamp split up different parts of their API into modules:

* Band
* Album
* Track
* URL

Each module is versioned. You may pass a version object after your key to set custom versions of each module. In the future, I will update this library to always use the latest version of each module, so if you want to explicitly set the versions for your app and upgrade without fear, you can.

```js
var versions = {
    band: 3,
    album: 2,
    track: 1,
    url: 1
};

var key = 'yourbandcampAPIkey', // contact <support@bandcamp.com> to request one
    bandcamp = require('bandcamp')(key, versions);
```

You may also include specific modules if you don't want to include all of them. The optional version parameter is an integer for individual modules.

```js
var band = require('bandcamp').band('apikeygoeshere', optionalVersionInteger),
    track = require('bandcamp').track('apikeygoeshere', 2);
```
## License 

tl;dr: Do whatever you want.

(The MIT License)

Copyright (c) 2011 Kelly Miyashiro &lt;miyashiro.kelly@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.