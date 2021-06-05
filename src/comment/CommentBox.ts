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
    const test = this.comments.map(com => `
                <div class="commentary-box" >
                  <div class="commentary-box-header">
                     <sub style="background-color: #C2C2C2;display:flex; flex-direction: column; align-items: flex-end">create: ${com.created} (${com.creator})</sub>
                     <hr style="margin-top: 0"/>
                     <span style="padding: 1em">${com.text}</span>
                  </div>
                </div>
            `).reduce((a, b) => a + b);
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
            ${test}
        `;
  }
}

customElements.define('comment-box', CommentBox);
