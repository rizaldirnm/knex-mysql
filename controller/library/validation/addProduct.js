const Validator = require("validator");
const isEmpty = require("./is-emtpy");

module.exports = function validateAddProduct(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";
  data.categories_id = !isEmpty(data.categories_id) ? data.categories_id : "";
  data.price = data.price >= 100 ? data.price : undefined;
  data.qty = data.qty > 0 ? data.qty : undefined;

  if (data.qty === undefined) {
    errors.qty = "Quantity must be at least 1";
  }

  if (data.price === undefined) {
    errors.price = "Price must be greater than 100";
  }
  if (Validator.isEmpty(data.categories_id)) {
    errors.categories_id = "Category ID not define!";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.desc)) {
    errors.desc = "Description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
