import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {getI18nBundle} from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

// Template
import MyVocabCreatorTemplate from "./generated/templates/MyVocabCreatorTemplate.lit.js";

// Styles
import MyGridCss from "./generated/themes/MyGrid.css.js";

import {COUNT} from "./generated/i18n/i18n-defaults.js";

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

export type Vocab = {
    readonly german: string;
    readonly reading: string;
    readonly kanji: string;
}

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

    public onSubmit = (e: Event) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        const german = formData.get('german');
        const reading = formData.get('reading');
        const kanji = formData.get('kanji');
        if (typeof german === 'string' && typeof reading === 'string' && typeof kanji === 'string') {
            this.fireEvent('add_vocab',{
                german,
                reading,
                kanji,
            } );
            console.log('dispatch add_vocab', {
                german,
                reading,
                kanji,
            })
        }
    }

}

MyVocabCreator.define();

export default MyVocabCreator;
