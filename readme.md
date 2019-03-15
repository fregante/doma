# doma [![Build Status](https://api.travis-ci.com/bfred-it/doma.svg?branch=master)](https://travis-ci.com/bfred-it/doma)

> Parse an HTML string into `DocumentFragment` or one `Element`, in a few bytes (in browser or jsdom)

## Install

```
npm install doma
```

## Setup

```js
const doma = require('doma');
```

```js
import doma from 'doma';
```

## Usage

```js
doma('<h1>Cats</h1> and dogs');
//=>  DocumentFragment[<h1>, Text(' and dogs')]

doma('the cow');
//=>  DocumentFragment[Text('the cow')]

doma.one('beautiful <i>bird</i>');
//=>  <i>

doma.one('wild animal');
//=>  null
```

# Related

- [indent-textarea](https://github.com/bfred-it/indent-textarea) - Add editor-like tab-to-indent functionality to <textarea>, in a few bytes.
- [Refined GitHub](https://github.com/sindresorhus/refined-github) - Uses this module.
