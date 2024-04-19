const express = require("express");
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const createError = require("../utils/error");
const cookieParser = require("cookie-parser");

router.get("/auth", (req,res) => {
    res.send("Auth Router", cookieParser)
    
})

router.post("/register", async(req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
    
        const newUser = new User({
          ...req.body,
          password: hash,
        });
    
        await newUser.save();
        res.status(200).send("User has been created.");
      } catch (err) {
        next(err);
      }
})

router.post("/login", async(req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));
    
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!isPasswordCorrect)
          return next(createError(400, "Wrong password or username!"));

          
    
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT
        );
    
        const { password, isAdmin, ...otherDetails } = user._doc;

       
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ details: { ...otherDetails }, isAdmin });

      } catch (err) {
        next(err);
      }
})



module.exports = router