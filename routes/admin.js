/*
 */

//

//

//working with file uploading

const path = require('path');

const express = require('express');

// const rootDir = require("../util/path");
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const { check, body } = require('express-validator');

const router = express.Router();

//storing products
const products = [];

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// // /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// // /admin/add-product => POST

router.post(
  '/add-product',
  isAuth,
  [
    body('title')
      //   .isAlphanumeric()    //-->because alphaNumeric does not take spaces between words so add isString()
      .isString()
      .withMessage('Title should be Stings')
      .isLength({ min: 3 })
      .trim(),
    // body('imageUrl', 'imageUrl should be URL').isURL().trim(),
    body('price', '	Price should be number').isFloat().trim(),
    body(
      'description',
      'your Product description should be minimum of 5 chars maximum of 500 charectors'
    )
      .isLength({ min: 5, max: 500 })
      .trim()
  ],
  adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
  '/edit-product',
  [
    body('title', 'title should be string')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl', 'imageUrl should be URL').isURL().trim(),
    body('price', 'price should be numbers'),
    body('description', 'description should be minimum of 5 chars length')
      .isLength({ min: 5, max: 500 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
