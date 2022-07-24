const doma = (html: string): DocumentFragment => {
	if (html === undefined || html === null) {
		return new DocumentFragment();
	}

	const template = document.createElement('template');
	template.innerHTML = html;
	return template.content;
};

doma.one = <T extends Element = Element>(html: string): T | undefined =>
	(doma(html).firstElementChild as T) ?? undefined;

export default doma;
