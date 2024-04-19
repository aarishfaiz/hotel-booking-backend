const mongoose = require("mongoose");
require("dotenv").config();

DATABASE = process.env.MONGODB_URL;
const url = DATABASE

module.exports.connect = () => {
  mongoose.connect(url, console.log("Database is Connected "));
};
