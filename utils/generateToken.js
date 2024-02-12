const jwt = require("jsonwebtoken");
const { use } = require("../app");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    "It is my Secret",
    {
      expiresIn: "7d",
    }
  );

  return token;
};

module.exports = generateToken;
