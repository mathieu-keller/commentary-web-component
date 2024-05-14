import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

// Template
import MyVocabCreatorTemplate from "./generated/templates/MyVocabCreatorTemplate.lit.js";

// Styles
import MyGridCss from "./generated/themes/MyGrid.css.js";

import { COUNT } from "./generated/i18n/i18n-defaults.js";

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
	tag: "my-vocab-creator",
	renderer: litRender,
	styles: MyGridCss,
	template: MyVocabCreatorTemplate,
})
class MyVocabCreator extends UI5Element {
	static i18nBundle: I18nBundle;

	static async onDefine() {
		console.log('vocab reloaded!')
		MyVocabCreator.i18nBundle = await getI18nBundle("vocab-creator");
	}

	public german:string = '';
	public reading:string = '';
	public kanji:string = '';

	public onChange = (e: Event) => {
		const currentTarget: HTMLInputElement = e.currentTarget as HTMLInputElement;
		switch (currentTarget.name) {
			case 'german':
				this.german = currentTarget.value;
				break;
			case 'kanji':
				this.reading = currentTarget.value;
				break;
			case 'reading':
				this.kanji = currentTarget.value;
				break;
			default:
				throw new Error('input '+ currentTarget.name + ' is not implemented')
		}
	}

	public onSubmit =(e:Event) => {
		e.preventDefault()
		console.log(e)
		console.log(new FormData(e.target as HTMLFormElement).get('german'))
	}

}

MyVocabCreator.define();

export default MyVocabCreator;
