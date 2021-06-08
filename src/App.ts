import {HTMLComponent} from "./HTMLComponent";
import {CommentDto} from "./CommentDto";

type AppProps = {
  readonly comments: CommentDto[];
}

class App extends HTMLComponent<AppProps> {
  private shadow: ShadowRoot;

  constructor() {
    super({comments: []});
    this.shadow = this.attachShadow({mode: 'open'});
    this.init();
  }

  init() {
    fetch('https://commentary-7f7cf-default-rtdb.europe-west1.firebasedatabase.app/.json')
      .then(r => r.json().then(j => {
        if (j !== null) {
          this.setState({comments: j})
        }
      }))
  }

  escapeInput(input: string): string {
    const map = new Map<string, string>([
      ["&", "&amp;"],
      ["<", "&lt;"],
      [">", "&gt;"],
      ["\"", "&quot;"],
    ]);
    return input.replaceAll(/[&<>"']/g, (m) => map.get(m) || m);
  }

  onClick(element: HTMLTextAreaElement | null) {
    if (element === null || element.value === '') return;
    const newComment: CommentDto = {
      text: this.escapeInput(element.value),
      creator: this.getAttribute('userId') || '',
      creatorName: this.getAttribute('username') || 'unknown',
      created: new Date().toISOString(),
    };
    fetch('https://commentary-7f7cf-default-rtdb.europe-west1.firebasedatabase.app/.json',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer', body: JSON.stringify([...this.state.comments, newComment])
      })
      .then(() => {
        element.value = '';
        this.setState({comments: [...this.state.comments, newComment]})
      }).catch(e => console.error(e));

  }

  view() {
    const comments = this.state.comments.map(com => `
                <div class="commentary-box" >
                  <div class="commentary-box-header">
                    <div style="background-color: #C2C2C2;display:flex; flex-direction: row; justify-content: space-between">
                        <sub>${com.creatorName}</sub>
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
            `).join('');
    this.shadow.innerHTML = `
<style>
            .commentary-box {
                border: 1px solid black; 
                padding: 0;
            }
            .commentary-box-header {
                width: 100%;
            }           
            </style>
            ${comments}
            <textarea id="comment-input" rows="7" placeholder="enter your comment...." style="resize: vertical;box-sizing: border-box;width: 100%"></textarea>
            <div style="display: flex;
              flex-direction: column;
              align-items: flex-end;">
              <button id="save-comment">
                    send
              </button>
              </div>
        `;
    const input = this.shadow.getElementById('comment-input') as HTMLTextAreaElement | null;
    this.shadow.getElementById('save-comment')?.addEventListener('click', () => this.onClick(input))
  }
}

customElements.define('comment-app', App);
