import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Zeenath Fathima",
    email: "zeenathsn107@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Dikshit Sharma",
    email: "dikshitsharma1187@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
