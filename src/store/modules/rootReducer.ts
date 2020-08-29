import { combineReducers } from "redux";

import cart from "./cart/reducer";

// Combine all reducers in 1 single reducer function, and call every child reducer, gather their data into a single state object
// Returns the data inside a function, not the function itself
export default combineReducers({
  cart,
});
