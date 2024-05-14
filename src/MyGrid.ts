import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

// Template
import MyGridTemplate from "./generated/templates/MyGridTemplate.lit.js";

// Styles
import MyGridCss from "./generated/themes/MyGrid.css.js";

import { COUNT } from "./generated/i18n/i18n-defaults.js";
import {Vocab} from "./MyVocabCreator";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>my-grid</code> component is a demo component that displays some text.
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "my-grid",
	renderer: litRender,
	styles: MyGridCss,
	template: MyGridTemplate,
})
class MyGrid extends UI5Element {

	listener = (event: Event) => {
		console.log('received event add_vocab', event)
		this.addVocab((event as CustomEvent<Vocab>).detail);
	}

	public onEnterDOM() {
		console.log('enter')
		window.addEventListener('add_vocab', this.listener);
	}

	public onExitDOM() {
		console.log('exit')
		window.removeEventListener('add_vocab', this.listener);
	}

	static i18nBundle: I18nBundle;

	static async onDefine() {
		console.log('reloaded!')
		MyGrid.i18nBundle = await getI18nBundle("grid");
	}

	public vocab: Vocab[] = [{
		german: 'test',
		kanji: 'kanji1',
		reading: 'reading123'
	}];

	public get vocabs() {
		return this.vocab
	}
	addVocab = (vocab: Vocab) => {
		this.vocab = [...this.vocab, vocab];
		console.log(this.vocab)
		console.log(vocab)
		this._render()
	}
}

MyGrid.define();

export default MyGrid;
