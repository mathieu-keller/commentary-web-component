export abstract class HTMLComponent<S = {}> extends HTMLElement {
  protected state: S;
  protected abstract view(): void;
  protected constructor(state?: S) {
    super();
    this.state = state || ({} as S);
  }

  setState(state: { [key in keyof S]: S[keyof S] }) {
    this.state = { ...this.state, ...state };
    this.triggerViewUpdate();
  }

  log(methodName: string) {
    return `${this.constructor.name}.${methodName}`;
  }

  connectedCallback() {
    console.group(this.log('connectedCallback'));
    this.triggerViewUpdate();
    console.groupEnd();
  }

  disconnectedCallback() {
    console.group(this.log('disconnectedCallback'));
    console.groupEnd();
  }

  triggerViewUpdate() {
    console.group(this.log('triggerViewUpdate'));
    console.log('state', this.state);
    this.view();
    console.groupEnd();
  }
}
