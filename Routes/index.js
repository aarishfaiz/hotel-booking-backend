const express = require('express');
const router = express.Router();

const hotel = require("../Controllers/Hotels");
const room = require("../Controllers/Rooms");
const user = require("../Controllers/User");
const auth = require("../Controllers/Auth");

router.get("/", (req, res) => {
    res.send("Hello Jee I am Backend");
})

router.use("/hotel", hotel );
router.use("/room", room );
router.use("/user", user );
router.use("/auth", auth );




module.exports = router;