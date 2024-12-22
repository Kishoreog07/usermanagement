import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Correct import for thunk
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
