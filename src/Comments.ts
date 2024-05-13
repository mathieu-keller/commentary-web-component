import { HTMLComponent } from './HTMLComponent';
import { CommentDto } from './CommentDto';
import { GlobalStylingClass } from './GlobalStyles';

type CommentProps = {
  readonly comments: CommentDto[];
};

export class Comments extends HTMLComponent<CommentProps> {
  private readonly shadow: ShadowRoot;

  constructor() {
    super({ comments: [] });
    this.shadow = this.attachShadow({ mode: 'open' });
    window.addEventListener('add_comment', (event: Event) => {
      this.setState({
        comments: [...this.state.comments, (event as any).detail],
      });
    });
    GlobalStylingClass.addGlobalStylesToShadowRoot(this.shadow);
  }

  view() {
    this.shadow.innerHTML = this.state.comments
      .map(
        (com) => `
                <div class="commentary-box" >
                  <div class="commentary-box-header">
                    <div class="commentary-box-header-content">
                        <sub>${com.creatorName}</sub>
                        <sub>
                            ${new Intl.DateTimeFormat(navigator.language, {
                              dateStyle: 'full',
                              timeStyle: 'long',
                            }).format(new Date(com.created))}</sub>
                    </div>
                    <hr/>
                    <pre>${com.text}</pre>
                  </div>
                </div>
            `,
      )
      .join('');
  }
}
