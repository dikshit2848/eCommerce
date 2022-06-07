//this is the file which is used to import some sample data in the database or remove all the data from the database

import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(`error in seeder.js :${error.message}`);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("data destroyed");
    process.exit();
  } catch (error) {
    console.log(`error in seeder.js :${error.message}`);
    process.exit(1);
  }
};
//  the process.argv[2] means the command we hit in the console..
// in this case if we want to destroy data we need to call the command `node backend/seeder -d` else node backend/seeder which will import the data
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
