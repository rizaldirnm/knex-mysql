const asyncForEach = require('../library/async').asyncForEach;

class ProductHelper {
  
  //Add Product
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
        .then(newProduct => {
          let categories = data.categories_id.replace(/\s/g, "").split(",");
          categories.map(category => {
            knex("product_category")
            .insert({
              product_id: newProduct[0],
              categories_id: category
            })
            .then(() =>
              resolve({ success: true, message: "Products success Added" })
            )
            .catch(() =>
              reject({ success: false, message: "Product fail to Added" })
            );
          })
        })
        .catch(err =>
          reject({ success: false, message: "Product fail to Added" })
        );
    });
  }

  //Edit Product
  editProduct(id, id_product, data) {
    return new Promise(async (resolve, reject) => {
      const product =  await knex('products').where('product_id', id_product);
      if(product.length <= 0) reject({success: false, message: "No Product found!"})

      await knex('products').where('product_id', id_product)
            .update({
              name: data.name,
              description: data.desc,
              price: data.price,
              qty: data.qty,
              user_id: id
            })

      await knex('product_category').where('product_id', id_product).del()
      let categories = data.categories_id.replace(/\s/g, "").split(",");
      categories.map(category => {
        knex('product_category').insert({
          product_id: id_product,
          categories_id: category
        }).then(() => resolve({success: true, message: "Product success edited"}))
          .catch(() => reject({success: false, message: "Product failed to edit"}))
      })
    })
  }

  //Delete Product
  deleteProduct(id) {
    return new Promise(async (resolve, reject) => {
      const idProduct = await knex("products").where("product_id", id);
      if (idProduct <= 0) {
        return reject({ success: false, message: "Product not exist!" });
      }
      await knex("products")
        .where("product_id", id)
        .del()
        .then(() =>
          knex('product_category')
          .where("product_id", id).del()
          .then((deleted) => resolve({success: true, message: "Product Success delete"}))
          .catch(err => reject({success: false, message: "Product fail to added"}))
        )
        .catch(err =>
          reject({ success: false, message: "Product fail to added" })
        );
    });
  }

  //View one product
  viewProduct(id) {
    return new Promise(async (resolve, reject) => {
      const product = await knex.select(
                                'products.product_id', 
                                'products.name',
                                'products.description',
                                'products.price',
                                'products.qty',
                                'products.create_product_at',
                                'users.name AS Created',
                                )
                                .where('products.product_id', id)
                                .from('products')
                                .innerJoin('users', 'products.user_id', 'users.user_id')
                                .innerJoin('product_category', 'products.product_id', 'product_category.product_id')
     const categories = await knex.select('categories.name')
                                  .where('products.product_id', id)
                                  .from('products')
                                  .innerJoin('product_category', 'products.product_id', 'product_category.product_id')
                                  .innerJoin('categories', 'product_category.categories_id', 'categories.categories_id');
    
    let category = [];
    categories.forEach(element => {
      category.push(element.name)
    });
    const objCategory = {category: category}
    const objState = product[0];
    const dataProduct = {...objState, ...objCategory}
    if(product.length <= 0) {
      return reject({success: false, message: "Product not exist!"})
    } 
      return resolve(dataProduct)
    });
  }

  //View all product
  viewAllProduct() {
    return new Promise(async (resolve, reject) => {
      let product = await knex.select('*').from('products');
      if(product.length <= 0) {
        return reject({success: false, message: "No product available"})
      }

      const allProduct = async () => {
        await asyncForEach(product, async(element, idx) => {
          const categories = await knex.select('categories.name AS Category')
                                       .from('product_category')
                                       .leftJoin('categories', 'categories.categories_id', 'product_category.categories_id')
                                       .where('product_category.product_id', element.product_id)        
                           
              let getCategory =  categories.map(category => category.Category);
              product[idx].category = getCategory
          })
          resolve(product);
      }

      allProduct();
    });
  }

  //Add Category
  addCategory(data) {
    return new Promise(async (resolve, reject) => {
      await knex("categories")
        .insert({
          name: data.name
        })
        .then(newProduct =>
          resolve({ success: true, message: "Category successfull added" })
        )
        .catch(err =>
          reject({ success: false, message: "Category fail to added" })
        );
    });
  }

  //Delete Category
  deleteCategory(id) {
    return new Promise(async (resolve, reject) => {
      const idCategory = await knex("categories").where("categories_id", id);
      if (idCategory.length <= 0) {
        return reject({ success: false, message: "Category not exist!" });
      } else {
        return await knex("categories")
          .where("categories_id", id)
          .del()
          .then(() =>
            knex('product_category')
              .where("categories_id", id).del()
              .then((deleted) => resolve({success: true, message: "Product Success delete"}))
              .catch(err => reject({success: false, message: "Product fail to added"}))
          )
          .catch(err =>
            reject({ success: false, message: "Category fail to added" })
          );
      }
    });
  }
}

module.exports = new ProductHelper();
