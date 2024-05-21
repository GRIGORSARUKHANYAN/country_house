class DOM {
	constructor() { throw new Error('not instance'); }

	static #classList(classList, element) {
		if (classList === null) { return; }
		if (Array.isArray(classList)) {
			for (let i = 0; i < classList.length; ++i) {
				element.classList.add(classList[i]);
			}
		} else {
			element.classList.add(classList);
		}
	}

	static CE(elementName, classData = null, parrent = null) {
		const element = document.createElement(elementName);
		this.#classList(classData, element);
		parrent && parrent.appendChild(element);

		return element;
	}

	static img(src, alt, classData, parrent = null) {
		const img = new Image();
		img.src = src;
		img.alt = alt;
		this.#classList(classData, img);
		parrent && parrent.appendChild(img);

		return img;
	}

	static link(href, linkText, target = null, parrent = null) {
		const a = document.createElement('a');
		a.href = href;
		a.innerHTML = linkText;
		target && (a.target = target);
		parrent && parrent.appendChild(a);

		return a;
	}

	static GE(elementName) {
		return document.querySelector(elementName);
	}
}

export default DOM;