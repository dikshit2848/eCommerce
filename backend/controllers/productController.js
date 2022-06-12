import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc   fetch all products
//@route  GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc   fetch single product
//@route  GET /api/products/:id
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

//@desc   delete a product
//@route  DELeTE /api/products/:id
//@access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "product removed" });
  } else {
    res.status(404);
    //    here if you see the error is thrown, and this error will be handled by our custom error handler in errorMiddleware.js file bcz the status code is set to 404 which is 'page not found' which will take it to notFound function in errorMiddleware.js and if we see  in notFound function 'next(error)' is written in server.js file which is about the errorHandler route which handles the custom error thrown by the server.
    throw new Error("product not found");
  }
});

//@desc   create a product
//@route  POST /api/products
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sampleName",
    price: 0,
    user: req.user._id,
    image: "/image/sample.jpg",
    brand: "sample Brand",
    category: "sample Category",
    countInstock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc   update a product
//@route  PUT /api/products/:id
//@access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInstock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInstock = countInstock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
