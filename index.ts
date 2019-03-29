function doma(html: string): DocumentFragment {
	if (html === undefined || html === null) {
		return new DocumentFragment();
	}
	const template = document.createElement('template');
	template.innerHTML = html;
	return template.content;
}

function domaOne<T extends Element = Element>(html: string): T | null {
	return doma(html).firstElementChild as T | null;
}

doma.one = domaOne;

module.exports = doma;
export default doma;
