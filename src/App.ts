import { Comments } from './Comments';
import { Input } from './Input';

const commentsTagName = 'comment-comments';
if (!window.customElements.get(commentsTagName)) {
  window.customElements.define(commentsTagName, Comments);
}

const inputTagName = 'comment-input';
if (!window.customElements.get(inputTagName)) {
  window.customElements.define(inputTagName, Input);
}
