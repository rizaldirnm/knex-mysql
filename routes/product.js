const express = require("express");
const router = express.Router();
const Auth = require("../controller/middleware/auth");
const exeProduct = require("../controller/execution/product");

// ================================ ROUTER API BEGIN ================================

// @route   POST api/product/add
// @desc    Add Product
// @access  Secret
router.post("/add", Auth.isUserLogin, Auth.isAdmin, exeProduct.postAddProduct);

// @route   POST api/product/delete
// @desc    Delete product
// @access  Secret
router.delete(
  "/delete/:id_product",
  Auth.isUserLogin,
  Auth.isAdmin,
  exeProduct.deleteProduct
);

module.exports = router;
