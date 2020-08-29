import React from "react";
import { useSelector } from "react-redux";

import { IState } from "../store";
import { ICartItem } from "../store/modules/cart/types";

const Cart: React.FC = () => {
  // useSelector receives two params: the first is the type of the state, the second is the type of the return of the function
  const cart = useSelector<IState, ICartItem[]>((state) => state.cart.items);

  // The only direct child of thead is tr
  return (
    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Subtotal</th>
        </tr>
      </thead>

      <tbody>
        {cart.map((item) => (
          <tr key={item.product.id}>
            <td>{item.product.title}</td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{(item.product.price * item.quantity).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Cart;