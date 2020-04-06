import test from 'ava';
import {JSDOM} from 'jsdom';
import doma from '.';

const {window} = new JSDOM('');
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.Text = window.Text;
global.Element = window.Element;
global.HTMLElement = window.HTMLElement;
global.HTMLParagraphElement = window.HTMLParagraphElement;

function getHTML(dom) {
	const element = document.createElement('div');
	element.append(dom);
	return element.innerHTML;
}

test('domesticate', t => {
	const html = '<wolf></wolf>';
	const dom = doma(html);
	t.true(dom instanceof DocumentFragment);
	t.is(dom.children.length, 1);
	t.true(dom.firstChild instanceof Element);
	t.is(dom.querySelectorAll('*').length, 1);
	t.is(getHTML(dom), html);
	t.is(dom.textContent, '');
});

test('domesticate many', t => {
	const html = '<cat></cat><strong class="Animal"></strong>';
	const dom = doma(html);
	t.true(dom instanceof DocumentFragment);
	t.is(dom.children.length, 2);
	t.true(dom.firstChild instanceof Element);
	t.is(dom.firstChild.tagName, 'CAT');
	t.true(dom.lastChild instanceof HTMLElement);
	t.is(dom.querySelectorAll('*').length, 2);
	t.is(getHTML(dom), html);
	t.is(dom.textContent, '');
});

test('domesticate offspring', t => {
	const html = '<cat><kitten></kitten></cat>';
	const dom = doma(html);
	t.true(dom instanceof DocumentFragment);
	t.is(dom.children.length, 1);
	t.true(dom.firstChild instanceof Element);
	t.true(dom.querySelector('kitten') instanceof Element);
	t.is(dom.querySelectorAll('*').length, 2);
	t.is(getHTML(dom), html);
	t.is(dom.textContent, '');
});

test('domesticate fantasy', t => {
	const html = 'unicorns and rainbows';
	const dom = doma(html);
	t.true(dom instanceof DocumentFragment);
	t.is(dom.childNodes.length, 1);
	t.is(dom.children.length, 0);
	t.true(dom.firstChild instanceof Text);
	t.is(dom.querySelectorAll('*').length, 0);
	t.is(getHTML(dom), html);
	t.is(dom.textContent, '');
});

test('domesticate animal kingdom', t => {
	const html = ' <p>Ci son due <coccodrilli> ed un <orango-tango>, due piccoli <serpenti> e un <aquila reale="">, il <gatto type="cat">, il <topo>, l’<elefante weight="heavy">: non manca più nessuno; solo non si vedono i due <leocorni aria-label="🦄">.</p>';
	const dom = doma(html);
	t.true(dom instanceof DocumentFragment);
	t.is(dom.childNodes.length, 2);
	t.is(dom.children.length, 1);
	t.true(dom.firstChild instanceof Text);
	t.is(dom.firstChild.textContent, ' ');
	t.true(dom.lastChild instanceof HTMLParagraphElement);
	t.is(dom.querySelectorAll('*').length, 9);
	t.is(getHTML(dom), html.replace('</p>', '</leocorni></elefante></topo></gatto></aquila></serpenti></orango-tango></coccodrilli></p>'));
	t.is(dom.textContent, '');
});

test('domesticate one', t => {
	const html = '<animal></animal>';
	const dom = doma.one(html);
	t.true(dom instanceof Element);
	t.is(dom.childNodes.length, 0);
	t.is(dom.firstChild, null);
	t.is(dom.querySelectorAll('*').length, 0);
	t.is(getHTML(dom), html);
	t.is(dom.textContent, '');
});

test('domesticate one wish', t => {
	const html = 'flying pigs';
	const dom = doma.one(html);
	t.is(dom, undefined);
});

test('domesticate one dirty farm', t => {
	const html = 'go to <town></town> on wild <puns/>';
	const dom = doma.one(html);
	t.true(dom instanceof Element);
	t.is(dom.childNodes.length, 0);
	t.is(dom.firstChild, null);
	t.is(dom.querySelectorAll('*').length, 0);
	t.is(getHTML(dom), '<town></town>');
	t.is(dom.textContent, '');
});
