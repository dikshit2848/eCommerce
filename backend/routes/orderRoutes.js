import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  // updateOrderByRazorPay,
  updateOrderToDelivered,
  updateRazorPayOrder,
  getRazorPay,
  // updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router
  .route("/:id/pay")
  .post(protect, getRazorPay)
  .put(protect, updateRazorPayOrder);
router.route("/:id/delivered").put(protect, admin, updateOrderToDelivered);

export default router;
