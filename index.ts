function doma(html: string): DocumentFragment {
	if (html === undefined || html === null) {
		return new DocumentFragment();
	}
	const template = document.createElement('template');
	template.innerHTML = html;
	return template.content;
}

function one(html: string): Element | null {
	return doma(html).firstElementChild;
}

doma.one = one;

module.exports = doma;
export default doma;
