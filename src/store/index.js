import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { fetchTodolist } from "./actions";

import reducer from "./reducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.dispatch(fetchTodolist());

export default store;
