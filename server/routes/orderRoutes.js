const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");


const {
    addOrder,
    getOrders
} = require("../controllers/orderController");



router.post(
    "/",
    upload.single("image"),
    addOrder
);



router.get(
    "/",
    getOrders
);



module.exports = router;