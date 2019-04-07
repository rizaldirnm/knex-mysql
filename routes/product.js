const express = require("express");
const router = express.Router();
const Auth = require("../controller/middleware/auth");
const helper = require("../controller/helper/product");
const validateAddProduct = require("../controller/library/validation/addProduct");

// ================================ ROUTER API BEGIN ================================

// @route   POST api/product/add
// @desc    Add Product
// @access  Secret
router.post("/add", Auth.isUserLogin, Auth.isAdmin, (req, res) => {
  const { errors, isValid } = validateAddProduct(req.body);
  if (!isValid) {
    return res.status(400).json({ error: errors });
  }
  const { user_id } = req.user;
  const data = req.body;
  helper
    .addProduct(user_id, data)
    .then(newProduct => res.json(newProduct))
    .catch(err => res.status(400).json({ postdata: false, error: err }));
});

// @route   POST api/product/delete
// @desc    Delete product
// @access  Secret
router.delete(
  "/delete/:id_product",
  Auth.isUserLogin,
  Auth.isAdmin,
  (req, res) => {
    const { id_product } = req.params;
    helper
      .deleteProduct(id_product)
      .then(deletedProduct => res.json(deletedProduct))
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
