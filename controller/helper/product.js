class ProductHelper {
  addProduct(id, data) {
    return new Promise(async (resolve, reject) => {
      await knex("products")
        .insert({
          name: data.name,
          description: data.desc,
          price: data.price,
          qty: data.qty,
          user_id: id
        })
        .then(newProduct =>
          resolve({ success: true, message: "Product successfull added" })
        )
        .catch(err =>
          reject({ success: false, message: "Product fail to added" })
        );
    });
  }

  deleteProduct(id) {
    return new Promise(async (resolve, reject) => {
      const idProduct = await knex("products").where("product_id", id);
      if (idProduct <= 0) {
        return reject({ success: false, message: "Product not exist!" });
      }
      await knex("products")
        .where("product_id", id)
        .del()
        .then(deleted =>
          resolve({ success: true, message: "Product successfull delted" })
        )
        .catch(err =>
          reject({ success: false, message: "Product fail to added" })
        );
    });
  }
}

module.exports = new ProductHelper();
