import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartContants";
// import produce from "immer";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === item.product ? item : cartItem
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    default:
      return state;
  }
  // produce(state, (draft) => {
  //   switch (action.type) {
  //     case CART_ADD_ITEM:
  //       const item = action.payload;
  //       console.log(draft);
  //       const existItem = draft.cartItems.find(
  //         (cartItem) => (cartItem.product = item.product)
  //       );
  //       if (existItem) {
  //         draft.cartItems.forEach((cartItem) =>
  //           cartItem.product === item.product ? item : cartItem
  //         );
  //       } else {
  //         draft.cartItems.push(item);
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // });
};
