import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// this is used to match the password entered with the encrypted password of the database by decryting itz
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//this is a middleware
// every time a new user is create(on User.create() method) or updated this function will automatically run (we do not even need to import it anywhere)
userSchema.pre("save", async function (next) {
  //this condition is for the updation of profile case..for say if user did not update the password but other things the we will enter in this condition to skip the further steps
  if (!this.isModified("password")) {
    next();
  }
  //these steps are to encrypt the password
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
