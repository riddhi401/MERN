const express = require("express");
const router = express.Router();

const { getProductById, createProduct,getProduct,photo,deleteProduct, updateProduct,getAllProudcts,getAllUniqueCategories } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//read

router.get("/product/:productId",getProduct);

//deal with fronted
router.get("/product/photo/:productId",photo);

router.delete(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
)


router.put(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
)

// listing routes get all product at one place

router.get("/product",getAllProudcts);


router.get("/products/categories",getAllUniqueCategories)




 



module.exports = router;


