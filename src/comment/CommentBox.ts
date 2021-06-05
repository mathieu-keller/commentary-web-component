import store from "../store/store";
import {Comment} from "../store/commentReducer";

class CommentBox extends HTMLElement {
  comments: readonly Comment[];

  constructor() {
    super();
    this.comments = [];
    store.subscribe(() => {
      console.log(store.getState());
      this.comments = store.getState().comments.comments || [];
      this.connectedCallback();
    })
  }

  connectedCallback() {
    const test =  this.comments.map(com => `
                <div class="commentary-box" >
                  <div class="commentary-box-header">
                      <div style="align-items: flex-start">Creator: ${com.creator}</div>
                      <div style="align-items: flex-end">create: ${com.created}</div>
                      <span>${com.text}</span>
                  </div>
                </div>
            `);
    console.log(test);
    this.innerHTML = `
            <style>
            .commentary-box {
                border: 1px solid black; 
                padding: 1em;
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
