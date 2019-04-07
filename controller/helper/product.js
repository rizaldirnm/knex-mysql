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
        .then(data => console.log(data))
        .catch(() =>
          reject({
            errorType: DATA_NOT_POSTED,
            message: "Terjadi kesalahan, data anda belum masuk"
          })
        );

      const newProduct = await knex("products").orderBy("product_id", "desc");
      resolve(newProduct[0]);
    });
  }
}

module.exports = new ProductHelper();
