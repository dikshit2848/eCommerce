import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc   fetch all products
//@route  GET /api/product
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc   fetch single product
//@route  GET /api/product/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    //    here if you see the error is thrown, and this error will be handled by our custom error handler in errorMiddleware.js file bcz the status code is set to 404 which is 'page not found' which will take it to notFound function in errorMiddleware.js and if we see  in notFound function 'next(error)' is written in server.js file which is about the errorHandler route which handles the custom error thrown by the server.
    throw new Error("product not found");
  }
});

export { getProductById, getProducts };
