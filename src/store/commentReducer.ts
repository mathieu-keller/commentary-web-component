import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Comment = {
  readonly text: string;
  readonly created: string;
  readonly creator: string;
  readonly updated: string;
  readonly updater: string;
  readonly subComment?: Comment;
}

const initState: {
  readonly comments: Comment[] | null,
} = {
  comments: null
};

const comments = createSlice({
  name: 'comments',
  initialState: initState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
    addComment(state, action: PayloadAction<Comment>) {
      if(state.comments === null){
        state.comments = [action.payload];
      }
      state.comments?.push(action.payload)
    },
  },
})

export default comments.reducer;

export const {addComment,setComments} = comments.actions;
