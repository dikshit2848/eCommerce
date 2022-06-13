import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.REACT_APP_RAZORPAY_KEY,
  key_secret: process.env.REACT_APP_RAZORPAY_KEY_SECRET,
});

//@desc   create new order
//@route  POST api/orders
//@access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });
    // this the order.save() will save the order into the database
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc   get order by Id
//@route  PUT api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

//@desc   get keys and stuff from razorpay
//@route  POST api/orders/:id/pay
//@access private
const getRazorPay = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    const payment_capture = 1;
    const currency = "INR";

    try {
      const options = {
        amount: order.totalPrice * 100,
        currency,
        receipt: order._id,
        payment_capture,
      };

      const response = await razorpay.orders.create(options);
      if (!response) return res.status(500).send("Some error occured");
      console.log(response);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

const updateRazorPayOrder = asyncHandler(async (req, res) => {
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.razorpayResult = {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      };
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//@desc   update order to paid
//@route  GET api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

//@desc   update order to deliverd
//@route  GET api/orders/:id/deliver
//@access private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

//@desc   GET logged in user orders
//@route  GET api/orders/myorders
//@access private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

//@desc   GET all orders for admin
//@route  GET api/orders
//@access private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getRazorPay,
  updateRazorPayOrder,
};
