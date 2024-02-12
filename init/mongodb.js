const mongoose = require("mongoose");

const connectMongodb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://niraj22chordia:Bharuni22@cluster0.emt6dxl.mongodb.net/blog-db?retryWrites=true&w=majority"
    );
    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectMongodb;
