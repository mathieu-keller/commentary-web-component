import { HTMLComponent } from './HTMLComponent';
import { CommentDto } from './CommentDto';
import { GlobalStylingClass } from './GlobalStyles';

export class Input extends HTMLComponent {
  private readonly shadow: ShadowRoot;

  constructor() {
    super({});
    this.shadow = this.attachShadow({ mode: 'open' });
    GlobalStylingClass.addGlobalStylesToShadowRoot(this.shadow);
  }

  escapeInput(input: string): string {
    const map = new Map<string, string>([
      ['&', '&amp;'],
      ['<', '&lt;'],
      ['>', '&gt;'],
      ['"', '&quot;'],
    ]);
    return input.replaceAll(/[&<>"']/g, (m) => map.get(m) || m);
  }

  private onClick(element: HTMLTextAreaElement | null) {
    if (!element || !element.value) return;
    const newComment: CommentDto = {
      text: this.escapeInput(element.value),
      creator: this.getAttribute('userId') || '',
      creatorName: this.getAttribute('username') || 'unknown',
      created: new Date().toISOString(),
    };
    element.value = '';
    window.dispatchEvent(
      new CustomEvent<CommentDto>('add_comment', {
        bubbles: true,
        detail: newComment,
      }),
    );
  }

  view() {
    this.shadow.innerHTML = `
            <textarea id="comment-input" rows="7" placeholder="enter your comment...." class="comment-input"></textarea>
            <div class="button-container">
                <button id="save-comment">send</button>
            </div>
        `;
    const input =
      this.shadow.querySelector<HTMLTextAreaElement>('#comment-input');
    this.shadow
      .querySelector('#save-comment')
      ?.addEventListener('click', () => this.onClick(input));
  }
}
