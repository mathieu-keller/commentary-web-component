import {combineReducers, createStore} from '@reduxjs/toolkit';
import comments from "./commentReducer";


const reducer = combineReducers({
  comments: comments,
});
const store = createStore(
  reducer, /* preloadedState, */
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
