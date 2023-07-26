/*
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admim/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then(result => {
      console.log('productsresult>> ', result);
      console.log('create>>', 'Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;

//   if (!editMode) {
//     res.redirect('/');
//   }
//   const prodId = req.params.productId;

//   Product.findById(prodId, product => {
//     if (!product) {
//       return res.redirect('/');
//     }
//     console.log(product);
//     res.render('admin/edit-product', {
//       pageTitle: 'Edit Product',
//       path: '/admim/edit-product',
//       editing: editMode,
//       product: product
//     });
//   });
// };
// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const upatedImageUrl = req.body.imageUrl;
//   const updtedPrice = req.body.price;
//   const updatedDesc = req.body.description;

//   const updatedProduct = new Product(
//     prodId,
//     updatedTitle,
//     upatedImageUrl,
//     updtedPrice,
//     updatedDesc
//   );
//   updatedProduct.save();
//   res.redirect('/admin/products');
// };

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    console.log('@@@>>', products);
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   console.log('%%%>>>', prodId);
//   Product.deleteById(prodId);
//   newFeature();
//   res.redirect('/admin/products');
// };
*/

//

//WORKING WITH MONGODB
/*
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admim/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );
  product
    .save()
    .then(result => {
      console.log('addproductresult>> ', result);
      console.log('create>>', 'Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};
//this getEditProduct is responsible for fetching products that should be edit and for rendering it
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    res.redirect('/');
  }
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      console.log('findproduct: ', product);
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//postEditProduct  is responsibel for saving changes to the database
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const upatedImageUrl = req.body.imageUrl;
  const updtedPrice = req.body.price;
  const updatedDesc = req.body.description;

  const product = new Product(
    updatedTitle,
    updtedPrice,
    updatedDesc,
    upatedImageUrl,

    prodId
  );
  product
    .save()
    .then(result => {
      console.log(result);
      console.log('product updatation>> ', 'PRODUCT UPDATED');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });

  // //without mongodb
  // Product.findById(prodId)
  //   .then(product => {
  //     (product.title = updatedTitle),
  //       (product.imageUrl = upatedImageUrl),
  //       (product.price = updtedPrice),
  //       (product.description = description);
  //     return prodcuct.save();
  //   })
  //   .then(result => {
  //     console.log('product updatation>> ', 'PRODUCT UPDATED');
  //     res.redirect('/admin/products');
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   upatedImageUrl,
  //   updtedPrice,
  //   updatedDesc
  // );
  // updatedProduct.save();
  // res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log('deletingprodId', prodId);
  Product.deleteById(prodId)
    .then(result => {
      console.log('deletedProduct: ', result);

      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
  // Product.deleteById(prodId);
  // res.redirect('/admin/products');  it work but you need to write correct way because it is a promise
};
*/

//WORKING WITH     M O N G O O S E

const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admim/add-product',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  // const imageUrl = req.body.imageUrl;
  // const imageUrl = req.body.image;
  const imageUrl = req.file;
  // const image = req.file;
  const price = req.body.price;
  const description = req.body.description;

  console.log('imageUrl>>>', imageUrl);

  const errors = validationResult(req);
  console.log(errors.array());

  if (!errors.isEmpty()) {
    console.log('postaddproductError', errors.array());
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admim/edit-product',
      editing: false,
      hasError: true, //-->>because we should ensure taht hasError is alos set in other places
      product: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }
  const product = new Product({
    // _id: new mongoose.Types.ObjectId('64bf5fa20ae617ecd612559c'),
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log('addproductresult>> ', result);
      console.log('create>>', 'Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      // // console.log('An error occured');    //even error occured in the above lines this console is excuted
      // // // which means we can handles the errror
      // // console.log(err);
      // return res.status(500).render('admin/edit-product', {
      //   pageTitle: 'Add Product',
      //   path: '/admim/add-product',
      //   editing: false,
      //   hasError: true, //-->>because we should ensure taht hasError is alos set in other places
      //   product: {
      //     title: title,
      //     imageUrl: imageUrl,
      //     price: price,
      //     description: description
      //   },
      //   errorMessage: 'Database operation failed, please try again.',
      //   validationErrors: []
      // });      // instead of rendring same page render the different page for database error
      // res.redirect('/500');  //-->> instead of redirecting here we can throw new error
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
//this getEditProduct is responsible for fetching products that should be edit and for rendering it
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    res.redirect('/');
  }
  const prodId = req.params.productId;

  // throw new Error('Dummy');   // this error also directly renders the 500 page

  Product.findById(prodId)
    .then(product => {
      // console.log('findTheproductToEdit: ', product);

      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => {
      // console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

//postEditProduct  is responsibel for saving changes to the database
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  const errors = validationResult(req);
  console.log('postEditProdutValidationErrorResult ', errors.array());

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      hasError: true,

      product: {
        title: updatedTitle,
        imageUrl: updatedImageUrl,
        price: updatedPrice,
        description: updatedDesc,
        _id: prodId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }
  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save().then(result => {
        console.log('PRODUCT UPDATED');
        console.log('updatedProductResult: ', result);
        res.redirect('/admin/products');
      });
    })
    .catch(err => {
      // console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  // Product.find()
  //without select().populate()
  //   // [
  //   {
  //     _id: new ObjectId("64b8bddecc8dc8a595cea700"),
  //     title: 'All books',
  //     price: 99.99,
  //     description: 'collection of books',
  //     imageUrl: 'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=690&h=930&D80F3D79-4382-49FA-BE4B4D0C62A5C3ED',
  //     userId: new ObjectId("64b8a824c09b99b59870fa4f"),
  //     __v: 0
  //   }
  // ]
  // with find().populate()
  // .populate('userId', 'name')
  //     // [
  //   {
  //     _id: new ObjectId("64b8bddecc8dc8a595cea700"),
  //     title: 'All books',
  //     price: 99.99,
  //     description: 'collection of books',
  //     imageUrl: 'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=690&h=930&D80F3D79-4382-49FA-BE4B4D0C62A5C3ED',
  //     userId: {
  //       cart: [Object],
  //       _id: new ObjectId("64b8a824c09b99b59870fa4f"),
  //       name: 'Max',
  //       email: 'max@test.com',
  //       __v: 0
  //     },
  //     __v: 0
  //   }
  // ]

  // with find().select().populate()  -->> in select method we can define which products you want exclude(with - (minus) sign)
  // .select('title price -_id')
  // .populate('userId', 'name')
  //     // [
  //   {
  //     title: 'All books',
  //     price: 99.99,
  //     userId: { _id: new ObjectId("64b8a824c09b99b59870fa4f"), name: 'Max' }
  //   }
  // ]
  Product.find({ userId: req.user._id })
    .then(products => {
      // console.log('gettingAllproductsAdminside: ', products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      // console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log('deletingprodId', prodId);

  // Product.findByIdAndRemove(prodId)  -->this will display the all the products to delet
  Product.deleteOne({ _id: prodId, userId: req.user._id }) //--->> this will allow the products to delete if the logged in user id is equal to product created userId
    .then(result => {
      console.log('deletedProduct: ', result);

      res.redirect('/admin/products');
    })
    .catch(err => {
      // console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
