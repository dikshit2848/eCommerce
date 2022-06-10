import jwt from "jsonwebtoken";

// in jwt.sign we have 3 parameter the payload object, the secret key and the third object of option in below case the expiresIn i.e. in 30days
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default generateToken;
