const validateAddProduct = require("../library/validation/addProduct");
const helper = require("../helper/product");

// =====================END IMPORT========================

//ADD PRODUCT
exports.postAddProduct = (req, res) => {
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
};

//DELETE PRODUCT
exports.deleteProduct = (req, res) => {
  const { id_product } = req.params;
  helper
    .deleteProduct(id_product)
    .then(deletedProduct => res.json(deletedProduct))
    .catch(err => res.status(400).json(err));
};
