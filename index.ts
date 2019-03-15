function domesticate(html: string): DocumentFragment {
	if (html === undefined || html === null) {
		return new DocumentFragment();
	}
	const template = document.createElement('template');
	template.innerHTML = html;
	return template.content;
}

function one(html: string): Element | null {
	return domesticate(html).firstElementChild;
}

domesticate.one = one;

module.exports = domesticate;
export default domesticate;
