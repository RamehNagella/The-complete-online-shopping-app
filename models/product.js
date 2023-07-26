// // const products = [];
/*
const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'product.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);

      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
*/

/*
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  title: Sequelize.STRING,

  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;
*/

//
/*
// WORKING WITH   M O N G O O  D B 

const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

// const ObjectId = new mongodb.ObjectId();

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    //here we connect mongodb and save the product
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('products').insertOne(this);
    }

    return dbOp
      .then(result => {
        console.log('insertedProduct>>', result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  //feetching all products

  static fetchAll() {
    const db = getDb();

    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log('<<<fetchall', products);

        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  //fetch single product
  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log('fetchsingle:>>', product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }
  //fetch singl product

  // static getProduct(prodId) {
  //   const db = getDb();
  //   return db
  //     .collection('products')
  //     .findOne({ _id: prodId })
  //     .next()
  //     .then(product => {
  //       console.log('<<11 : ', product);
  //       return product;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(result => {
        console.log('deletionResult', result);
        console.log('PRODUCT DELETED');
        // return res.redirect('/admin/products');  -->>here no need to redirect it wont work because redirect action will be taken in controllers only
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;

*/
//

// WORKING WITH   M O N G O O S E
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productShcema = new Schema({
  //in this schema we will define how our product looklike here we define data shcema and product

  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Product', productShcema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// // const ObjectId = new mongodb.ObjectId();

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     //here we connect mongodb and save the product
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }

//     return dbOp
//       .then(result => {
//         console.log('insertedProduct>>', result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   //feetching all products

//   static fetchAll() {
//     const db = getDb();

//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log('<<<fetchall', products);

//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   //fetch single product
//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         console.log('fetchsingle:>>', product);
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   //fetch singl product

//   // static getProduct(prodId) {
//   //   const db = getDb();
//   //   return db
//   //     .collection('products')
//   //     .findOne({ _id: prodId })
//   //     .next()
//   //     .then(product => {
//   //       console.log('<<11 : ', product);
//   //       return product;
//   //     })
//   //     .catch(err => {
//   //       console.log(err);
//   //     });
//   // }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(result => {
//         console.log('deletionResult', result);
//         console.log('PRODUCT DELETED');
//         // return res.redirect('/admin/products');  -->>here no need to redirect it wont work because redirect action will be taken in controllers only
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
