# doma [![npm version](https://img.shields.io/npm/v/doma.svg)][link-npm] [![(size)][badge-gzip]](#no-link)

[badge-gzip]: https://img.shields.io/bundlephobia/minzip/doma.svg?label=gzipped
[link-npm]: https://www.npmjs.com/package/doma

> Parse an HTML string into `DocumentFragment` or one `Element`, in a few bytes (in browser or jsdom)

## Install

```
npm install doma
```

## Setup

```js
// This module is only offered as a ES Module
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

### More examples

#### Example: AJAXed page

Note: `script` tags are not executed, but other `on*` handlers will run normally once attached to the document.

```js
const response = await fetch('page.html');
const html = await response.text();
const dom = doma(html);
const ajaxedContent = dom.querySelector('#ajax-container').childNodes;

const ajaxedContainer = document.querySelector('#ajax-container');
ajaxedContainer.append(...ajaxedContent);
```

#### Example: Parse images from HTML

Note: images are not fetched when the HTML is parsed. The elements only become "active" (and start loading) once appended to the document.

```js
const html = 'They say it’s round <img src="earth.jpg"> but actually it’s banana-shaped <img src="banana.tiff">';
const dom = doma(html);
// =>  DocumentFragment[Text('They say it’s round '), <img>, Text(' but actually it’s banana-shaped ', <img>]

const images = dom.querySelectorAll('img');
// =>  NodeList[<img>, <img>]
```

#### Example: Drop HTML tags from string

```js
const html = '<em>Never</em> gonna give you <sup>up</sup>, never gonna let you <sub>down</sub>';
const string = doma(html).textContent;
// =>  'Never gonna give you up, never gonna let you down'
```

## Related

- [select-dom](https://github.com/fregante/select-dom) - Lightweight `querySelector`/`All` wrapper that outputs an Array.
- [delegate-it](https://github.com/fregante/delegate-it) - DOM event delegation, in <1KB.
- [Refined GitHub](https://github.com/sindresorhus/refined-github) - Uses this module.

## License

MIT © [Federico Brigante](https://fregante.com)
