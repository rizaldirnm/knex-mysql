const express = require("express");
const router = express.Router();
const Auth = require("../controller/middleware/auth");
const exeProduct = require("../controller/execution/product");

// ================================ ROUTER API BEGIN ================================

// @route   POST api/product/add
// @desc    Add Product
// @access  Secret
router.post("/add", Auth.isUserLogin, Auth.isAdmin, exeProduct.postAddProduct);

// @route   DELETE api/product/delete
// @desc    Delete product
// @access  Secret
router.delete("/delete/:id_product", Auth.isUserLogin, Auth.isAdmin, exeProduct.deleteProduct);

// @route   GET api/product/all
// @desc    View all product
// @access  Secret
router.get("/all", Auth.isUserLogin, Auth.isAdmin, exeProduct.getViewAllProduct);

// @route   POST api/product/category/delete/:category_id
// @desc    Delete category
// @access  Secret
router.get("/view/:product_id", Auth.isUserLogin, Auth.isAdmin, exeProduct.getViewProduct)

// @route   POST api/product/category/add
// @desc    Create Category for products
// @access  Secret
router.post("/category/add", Auth.isUserLogin, Auth.isAdmin, exeProduct.postAddCategory);

// @route   POST api/product/category/delete/:category_id
// @desc    Delete category
// @access  Secret
router.delete("/category/delete/:category_id", Auth.isUserLogin, Auth.isAdmin,exeProduct.deleteCategory);



module.exports = router;
