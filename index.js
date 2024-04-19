const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require('dotenv').config();
const cookieParser = require("cookie-parser")


const port = process.env.PORT || 5000;
const cors = require("cors");

const { connect } = require("./Db");
const router = require("./Routes/index")

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.get("/", (req, res) => {
  res.send("Hello This is MY Backend");
});

app.use("/api", router);
connect();

 

app.listen(port, () => {
  console.log("Server is Running" + ` ${port}`);
});
