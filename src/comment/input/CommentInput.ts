import store from "../../store/store";
import {addComment} from "../../store/commentReducer";

class CommentInput extends HTMLElement {
  constructor() {
    super();
  }

  escapeInput(input: string): string{
    const map = new Map<string,string>([
      ["&", "&amp;"],
      ["<", "&lt;"],
      [">", "&gt;"],
      ["\"", "&quot;"],
    ]);
    return input.replaceAll(/[&<>"']/g, (m) => map.get(m) || m);
  }

  onClick(element: HTMLTextAreaElement | null) {
    if (element === null || element.value === '') return;
    const newComment = {
      text: this.escapeInput(element.value) ,
      creator: 'test user',
      created: new Date().toISOString(),
      updater: null,
      updated: null
    };
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
      .then(() => {
        store.dispatch(addComment(newComment));
        element.value = '';
      }).catch(e => console.error(e));

  }

  connectedCallback() {
    this.innerHTML = `
            <textarea rows="7" placeholder="enter your comment...." style="resize: vertical;box-sizing: border-box;width: 100%"></textarea>
            <div style="display: flex;
              flex-direction: column;
              align-items: flex-end;">
              <button style="background-color: #EBEBEB;
                padding: 1em;
                border: 1px solid #BFBFBF;
                width: 8em;">
                    send
              </button>
              </div>
        `;
    const input = this.getElementsByTagName('textarea').item(0);
    this.getElementsByTagName('button')
      .item(0)?.addEventListener('click', () => this.onClick(input))

  }
}

customElements.define('comment-input', CommentInput);
