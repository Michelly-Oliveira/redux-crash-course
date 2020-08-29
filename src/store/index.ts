import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";

import { ICartState } from "./modules/cart/types";

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

// All the middlewares to be used
const middlewares = [sagaMiddleware];

// Initialize the store(state) with a value - an object containing all the results of each reducers
const store = createStore(
  rootReducer,
  // Apply middlewares to the dispatch of Redux
  composeWithDevTools(applyMiddleware(...middlewares))
);

// Run the function we created to intercept the data between an action and the reducer
sagaMiddleware.run(rootSaga);

export default store;
