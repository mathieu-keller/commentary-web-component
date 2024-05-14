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
	static i18nBundle: I18nBundle;

	static async onDefine() {
		console.log('reloaded!')
		MyGrid.i18nBundle = await getI18nBundle("grid");
	}

	/**
	 * Defines the component count.
	 * @default 0
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 0 })
	count!: number;

	public vocab: { german: string; reading: string; kanji: string}[] = [];

	onClick() {
		this.count++;
		this.vocab = [...this.vocab, {german: 'Ich', reading: 'わたし', kanji: '私'}]
	}

	get counterText() {
		return MyGrid.i18nBundle.getText(COUNT);
	}
}

MyGrid.define();

export default MyGrid;
