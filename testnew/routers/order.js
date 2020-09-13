const express = require("express");
const router = express.Router();



const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById,pushOrderInPurchaseList } = require("../controllers/user");
const {updatestock} = require ("../controllers/product");

const {
    getOrderById,
    createOrder,
    getAllOrders,
    getOrderStatus,
    updateStatus
} = require("../controllers/order");


//parms

router.get("userId",getUserById)
router.get("orderId",getOrderById)


//order create route
router.post(
    "/order/create/:userId",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updatestock,
    createOrder
)


//read

router.get(
    "/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders

)
// status routes
router.get(
    "/order/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus

)

// update routes
router.put(
    "/order/:orderId/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus

)

module.exports = router;