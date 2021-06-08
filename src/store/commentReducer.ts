export type Comment = {
  readonly text: string;
  readonly created: string;
  readonly creator: number;
  readonly creatorName: string;
}

const initState: {
  readonly comments: Comment[] | null,
} = {
  comments: null
};

type AddComment = {
  type: 'ADD_COMMENT';
  payload: Comment;
}
export const addComment = (payload: Comment): AddComment => {
  return {type: 'ADD_COMMENT', payload: payload};
}

type SetComments = {
  type: 'SET_COMMENTS';
  payload: Comment[];
}
export const setComments = (payload: Comment[]): SetComments => {
  return {type: 'SET_COMMENTS', payload: payload};
}

const comments = (state = initState, action: AddComment | SetComments) => {
  switch (action.type) {
    case "SET_COMMENTS": {
      return {...state, comments: action.payload};
    }
    case "ADD_COMMENT": {
      const stateComments = state.comments || [];
      return {...state, comments: [...stateComments, action.payload]};
    }
    default:
      return state;
  }
}

export default comments;



