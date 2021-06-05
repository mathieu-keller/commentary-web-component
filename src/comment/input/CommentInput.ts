import store from "../../store/store";
import {addComment} from "../../store/commentReducer";

class CommentInput extends HTMLElement {
  constructor() {
    super();
  }

  onClick(value?: string) {
    if (value === undefined) return;
    const newComment = {
      text: value,
      creator: 'test user',
      created: new Date().toDateString(),
      updater: 'test user',
      updated: new Date().toDateString()};
    fetch('https://commentary-7f7cf-default-rtdb.europe-west1.firebasedatabase.app/.json',
      {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', body: JSON.stringify([...(store.getState().comments.comments || []), newComment])
      })
      .then(() => store.dispatch(addComment(newComment))).catch(e => console.error(e));

  }

  connectedCallback() {
    this.innerHTML = `
            <input/>
            <button>save</button>
        `;
    const input = this.getElementsByTagName('input').item(0);
    this.getElementsByTagName('button')
      .item(0)?.addEventListener('click', () => this.onClick(input?.value))

  }
}

customElements.define('comment-input', CommentInput);
