import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducers";

const reducer = {
  productList: productListReducer,
  productDetails: productDetailReducer,
};
const initialState = {};

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
