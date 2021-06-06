import store from "../store/store";
import {Comment} from "../store/commentReducer";

class CommentBox extends HTMLElement {
  comments: readonly Comment[];

  constructor() {
    super();
    this.comments = [];
    store.subscribe(() => {
      this.comments = store.getState().comments.comments || [];
      this.connectedCallback();
    })
  }

  connectedCallback() {
    const comments = this.comments.map(com => `
                <div class="commentary-box" >
                  <div class="commentary-box-header">
                    <div style="background-color: #C2C2C2;display:flex; flex-direction: row; justify-content: space-between">
                        <sub>${com.creator}</sub>
                        <sub>
                            ${new Intl.DateTimeFormat(navigator.language, {
      dateStyle: 'full',
      timeStyle: 'long'
    }).format(new Date(com.created))}</sub>
                    </div>
                    <hr style="margin-top: 0"/>
                    <pre style="padding: 0.25em">${com.text}</pre>
                  </div>
                </div>
            `);
    this.innerHTML = `
            <style>
            .commentary-box {
                border: 1px solid black; 
                padding: 0;
            }
            .commentary-box-header {
                width: 100%;
            }           
            </style>
            ${comments.length > 0 ? comments.reduce((a, b) => a + b) : ''}
        `;
  }
}

customElements.define('comment-box', CommentBox);
