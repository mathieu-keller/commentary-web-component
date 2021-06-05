export type Comment = {
  readonly text: string;
  readonly created: string;
  readonly creator: string;
  readonly updated: string | null;
  readonly updater: string | null;
  readonly subComment?: Comment;
}

const initState: {
  readonly comments: Comment[] | null,
} = {
  comments: null
};

type addComment = {
  type: 'ADD_COMMENT';
  payload: Comment;
}
export const addComment = (payload: Comment): addComment => {
  return {type: 'ADD_COMMENT', payload: payload};
}

type setComments = {
  type: 'SET_COMMENTS';
  payload: Comment[];
}
export const setComments = (payload: Comment[]): setComments => {
  return {type: 'SET_COMMENTS', payload: payload};
}

const comments = (state = initState, action: addComment | setComments) => {
  switch (action.type) {
    case "SET_COMMENTS": {
      return {...state, comments: action.payload};
    }
    case "ADD_COMMENT": {
      const comments = state.comments || [];
      return {...state, comments: [...comments, action.payload]};
    }
    default:
      return state;
  }
}

export default comments;



