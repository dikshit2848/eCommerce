import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();

//morgan is used for logging the url that are triggered from frontend of postman. logged in the console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//this allow us to accept json data in the body
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
