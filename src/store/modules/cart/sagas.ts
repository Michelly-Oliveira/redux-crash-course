import { all, takeLatest, select, call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import {
  addProductToCartRequest,
  addProductToCartSuccess,
  addProductToCartFailure,
} from "./actions";
import { IState } from "../..";
import api from "../../../services/api";
import { ActionTypes } from "./types";

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  // select - get information from state
  const currentQuantity: number = yield select((state: IState) => {
    // Return the quantity if product exists in the cart, if not return zero
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });

  // Use call() to execute async functions
  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(
    api.get,
    `stock/${product.id}`
  );

  if (availableStockResponse.data.quantity > currentQuantity) {
    // put = dispatch -> call an action
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

// Like Promise.all, run multiple events (like takeLatest) and wait for them all to complete
export default all([
  // takeLatest = use the last/most recent action(triggered by the user) to run the function(middleware), if any previous function is still executing, cancel it
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
