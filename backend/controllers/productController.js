import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc   fetch all products
//@route  GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  //below functionality is for seaching items based on the search keyword..if there is data then regex is created on name else keyword is empty
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  //.limit will limit the result to the limit we have set and .skip will skip the number of items..in this case 2(pageSize)*pageNumber-1
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  // console.log(products);
  // return the total_number_of_pages and the currentPage and the products
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
    image: "/images/sampleImage.jpg",
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

//@desc   create a new Review
//@route  POST /api/products/:id/review
//@access private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, singleReview) => {
        return (acc += singleReview.rating);
      }, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//@desc   get top rated products
//@route  GET /api/products/top
//@access public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
