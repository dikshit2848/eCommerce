import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = {
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
};

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : null;

// the initial state is different for all the reducers we define.. every reducer has its own state which redux help to control..below u can see that different reducers has different states
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

//this thunk help in adding a function inside of a function as we did in productActions.js file
const middleware = [thunk];

const store = configureStore({
  reducer,
  initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

// (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware);
// the above function helps in adding the default middleware with the custom middlewares

export default store;
