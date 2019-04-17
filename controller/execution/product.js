const validateAddProduct = require("../library/validation/addProduct");
const validateAddCategory = require("../library/validation/addCategory");
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
    .catch(err => res.status(422).json({ postdata: false, error: err }));
};

//DELETE PRODUCT
exports.deleteProduct = (req, res) => {
  const { id_product } = req.params;
  helper
    .deleteProduct(id_product)
    .then(deletedProduct => res.json(deletedProduct))
    .catch(err => res.status(422).json(err));
};

//EDIT PRODUCT
exports.editProduct = (req, res) => {
  const { errors, isValid } = validateAddProduct(req.body);
  if (!isValid) {
    return res.status(400).json({ error: errors });
  }
  const { user_id } = req.user;
  const {id_product} = req.params;
  const data = req.body;
  helper
    .editProduct(user_id, id_product, data)
    .then(deleteProduct => res.json(deleteProduct))
    .catch(err => res.status(422).json(err))
}

//VIEW ONE PRODUCT
exports.getViewProduct = (req, res) => {
  const { product_id } = req.params;
  helper
    .viewProduct(product_id)
    .then(product => res.status(200).json({ success: true, data: product }))
    .catch(err => res.status(422).json(err));
};

//VIEW ALL PRODUCT
exports.getViewAllProduct = (req, res) => {
  helper
    .viewAllProduct()
    .then(product => res.status(200).json({ success: true, data: product }))
    .catch(err => res.status(422).json(err));
};

//ADD CATEGORY
exports.postAddCategory = (req, res) => {
  const { errors, isValid } = validateAddCategory(req.body);
  if (!isValid) {
    return res.status(400).json({ error: errors });
  }
  const data = req.body;
  helper
    .addCategory(data)
    .then(newCategory => res.status(200).json(newCategory))
    .catch(err => res.status(422).json(err));
};

//DELETE CATEGORY
exports.deleteCategory = (req, res) => {
  const { category_id } = req.params;
  helper
    .deleteCategory(category_id)
    .then(category => res.status(200).json(category))
    .catch(err => res.status(422).json(err));
};
