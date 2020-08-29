import { Reducer } from "redux";
import produce from "immer";

import { ICartState, ActionTypes } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};

// A reducer is a function that returns the state of a specific module - an isolated functionality
const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  // produce receives two params: the first is the state before the changes, the second is a function - receives the state as draft, and inside this second function we can modify te state without using immutability
  return produce(state, (draft) => {
    switch (action.type) {
      // Only add product to cart if the check was successful
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }
      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);

        break;
      }
      default: {
        // If the action is not one of the types above, just return the state without modifying it
        return draft;
      }
    }
  });
};

export default cart;
