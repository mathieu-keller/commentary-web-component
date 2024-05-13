import { Comments } from './Comments';
import { Input } from './Input';

interface Element {
  new (): HTMLElement;
}

function registerCustomElement(tagName: string, element: Element) {
  if (!window.customElements.get(tagName)) {
    window.customElements.define(tagName, element);
  }
}

registerCustomElement('comment-comments', Comments);
registerCustomElement('comment-input', Input);
