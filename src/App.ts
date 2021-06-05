import './comment/CommentBox'
import './comment/input/CommentInput'
import store from "./store/store";
import {setComments} from "./store/commentReducer";

class App extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.init();
  }

  init() {
    fetch('https://commentary-7f7cf-default-rtdb.europe-west1.firebasedatabase.app/.json')
      .then(r => r.json().then(j => store.dispatch(setComments(j))))
  }

  connectedCallback() {
    this.shadow.innerHTML = `
           <comment-box></comment-box>
           <comment-input></comment-input>
        `;
  }
}

customElements.define('test-app', App);
