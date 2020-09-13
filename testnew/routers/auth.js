var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "NAME SHOULD BE AT LEAST 3 CHAR").isLength({ min: 3 }),
    check("email", "EMAIL IS REQUIRED ").isEmail(),
    check("password", "PASSWORD SHOULD BE AT LEAST 3 CHAR").isLength({ min: 3 })
  ],
  signup        
);

router.post(
  "/signin",
  [
    check("email", "EMAIL IS REQUIRED").isEmail(),
    check("password", "PASSWORD FIELD IS REQUIRED").isLength({ min: 1 })
  ],
  signin
);

router.get("/signout", signout);

router.get("/test",isSignedIn,(req,res)=>{
  res.json(req.auth);

})

module.exports = router;

