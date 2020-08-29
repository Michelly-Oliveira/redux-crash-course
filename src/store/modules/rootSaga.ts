import { all } from "redux-saga/effects";

import cart from "./cart/sagas";

// Async function
// Continuet to execute code after all the sagas(middlewares) have finished - Promise.all
export default function* rootSaga() {
  return yield all([cart]);
}
