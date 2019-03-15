import test from 'ava';
import {JSDOM} from 'jsdom';
import dominate from '.';

const {window} = new JSDOM('');
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.Text = window.Text;
global.Element = window.Element;
global.HTMLElement = window.HTMLElement;
global.HTMLBaseElement = window.HTMLBaseElement;
global.HTMLTimeElement = window.HTMLTimeElement;
global.HTMLParagraphElement = window.HTMLParagraphElement;
global.HTMLHeadingElement = window.HTMLHeadingElement;

function getHTML(dom) {
	const el = document.createElement('div');
	el.append(dom);
	return el.innerHTML;
}

test('dominate', t => {
	const html = '<base>';
	const dom = dominate(html);
	t.true(dom instanceof DocumentFragment);
	t.is(dom.children.length, 1);
	t.true(dom.firstChild instanceof HTMLBaseElement);
	t.is(dom.querySelectorAll('*').length, 1);
	t.is(getHTML(dom), html);
	t.is(dom.textContent, '');
});

test('dominate many', t => {
	const html = '<h1></h1><p></p>';
	const dom = dominate(html);
	t.true(dom instanceof DocumentFragment);
	t.is(dom.children.length, 2);
	t.true(dom.firstChild instanceof HTMLHeadingElement);
	t.true(dom.lastChild instanceof HTMLParagraphElement);
	t.is(dom.querySelectorAll('*').length, 2);
	t.is(getHTML(dom), html);
	t.is(dom.textContent, '');
});

test('dominate descendants', t => {
	const html = '<p><em></em></p>';
	const dom = dominate(html);
	t.true(dom instanceof DocumentFragment);
	t.is(dom.children.length, 1);
	t.true(dom.firstChild instanceof HTMLParagraphElement);
	t.true(dom.querySelector('em') instanceof HTMLElement);
	t.is(dom.querySelectorAll('*').length, 2);
	t.is(getHTML(dom), html);
	t.is(dom.textContent, '');
});

test('dominate books', t => {
	const html = 'rewriting (git) history';
	const dom = dominate(html);
	t.true(dom instanceof DocumentFragment);
	t.is(dom.childNodes.length, 1);
	t.is(dom.children.length, 0);
	t.true(dom.firstChild instanceof Text);
	t.is(dom.querySelectorAll('*').length, 0);
	t.is(getHTML(dom), html);
	t.is(dom.textContent, '');
});

test('dominate universe', t => {
	const html = ' <city>Rome</city> <strong>wasn’t</strong> built in <time datetime="PTH24">a day</time>';
	const dom = dominate(html);
	t.true(dom instanceof DocumentFragment);
	t.is(dom.childNodes.length, 6);
	t.is(dom.children.length, 3);
	t.true(dom.firstChild instanceof Text);
	t.is(dom.firstChild.textContent, ' ');
	t.true(dom.lastChild instanceof HTMLTimeElement);
	t.is(dom.querySelectorAll('*').length, 3);
	t.is(getHTML(dom), html);
	t.is(dom.textContent, '');
});

test('dominate one', t => {
	const html = '<base>';
	const dom = dominate.one(html);
	t.true(dom instanceof HTMLBaseElement);
	t.is(dom.childNodes.length, 0);
	t.is(dom.firstChild, null);
	t.is(dom.querySelectorAll('*').length, 0);
	t.is(getHTML(dom), html);
	t.is(dom.textContent, '');
});

test('dominate one story', t => {
	const html = 'elvis has left the building';
	const dom = dominate.one(html);
	t.is(dom, null);
});

test('dominate one dirty town', t => {
	const html = 'go to <town></town> on <puns/>';
	const dom = dominate.one(html);
	t.true(dom instanceof Element);
	t.is(dom.childNodes.length, 0);
	t.is(dom.firstChild, null);
	t.is(dom.querySelectorAll('*').length, 0);
	t.is(getHTML(dom), '<town></town>');
	t.is(dom.textContent, '');
});
