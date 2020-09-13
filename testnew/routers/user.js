const express = require("express");
const router = express.Router();


const {getUserById,getUser,updateUser,userPurchaseList} = require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")


//parma for a getuser by id
router.param("userId",getUserById)

// get user 
router.get("/user/:userId",isSignedIn,isAuthenticated, getUser);

//update user
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);


router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);


module.exports = router;
