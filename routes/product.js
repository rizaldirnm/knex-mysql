const express = require("express");
const router = express.Router();
const Auth = require("../controller/middleware/auth");
const helper = require("../controller/helper/product");

// @route   POST api/product/add
// @desc    Add Product
// @access  Public
router.post("/add", Auth.isUserLogin, Auth.isAdmin, (req, res) => {
  const { user_id } = req.user;
  const data = req.body;
  helper
    .addProduct(user_id, data)
    .then(newProduct => res.json({ postdata: true, data: newProduct }))
    .catch(err => res.status(400).json({ postdata: false, error: err }));
});

module.exports = router;
