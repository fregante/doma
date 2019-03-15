# domesticate [![Build Status](https://api.travis-ci.com/bfred-it/domesticate.svg?branch=master)](https://travis-ci.com/bfred-it/domesticate)

> Parse an HTML string into `DocumentFragment` or one `Element`, in a few bytes (in browser or jsdom)

## Install

```
npm install domesticate
```

## Setup

```js
const domesticate = require('domesticate');
```

```js
import domesticate from 'domesticate';
```

## Usage

```js
domesticate('<h1>Cats</h1> and dogs');
//=>  DocumentFragment[<h1>, Text(' and dogs')]

domesticate('the cow');
//=>  DocumentFragment[Text('the cow')]

domesticate.one('beautiful <i>bird</i>');
//=>  <i>

domesticate.one('wild animal');
//=>  null
```

# Related

- [indent-textarea](https://github.com/bfred-it/indent-textarea) - Add editor-like tab-to-indent functionality to <textarea>, in a few bytes.
- [Refined GitHub](https://github.com/sindresorhus/refined-github) - Uses this module.
