// worked with  authoriztion and validation
/*
const express = require('express');

const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Enter correct Email address')
      .normalizeEmail(),
    body('password', 'Enter valid password!!')
      .isLength({ min: 5 })
      .isAlphanumeric()
  ],
  authController.postLogin
);

router.post('/logout', authController.postLogout);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        console.log('customvalueerrorfromSignUp', value);
        // if (value === 'test@test.com') {
        //   //->> this validation ise used for specific emails if u want display the specific message for specific emails u could use this validations
        //   throw new Error('This email address if forbiden.');
        // }
        // return true; // this will return  the whatever the mail is written that will be accepted

        //instead of above we can use which has more sense
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            // req.flash('error', 'E-mail exist already pick different one');
            //   }
            // return res.redirect('/signup)

            return Promise.reject(
              'E-mail exists already, please pick a different one.'
            );
          }
        });

        //the above validation is called async vlidation
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 charectors.'
    )
      .isLength({ min: 5 })
      //   .withMessage(
      //     //instead of doing like this just add on body as another parameter it looks goood
      //     'Please enter a password with only numbers and text and at least 5 charectors.'
      //   )
      .isAlphanumeric()
      .trim(), //-->>after this we can add which ever letters we want as a password by writing the built in methods
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        console.log('confimpasssword>>', value);
        if (value !== req.body.password) {
          throw new Error('Password didnot match');
        }
        return true;
      })
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getRest);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
*/

//

//working with error handling

const express = require('express');

const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Enter correct Email address')
      .normalizeEmail(),
    body('password', 'Enter valid password!!')
      .isLength({ min: 5 })
      .isAlphanumeric()
  ],
  authController.postLogin
);

router.post('/logout', authController.postLogout);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        console.log('customvalueerrorfromSignUp', value);

        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            // req.flash('error', 'E-mail exist already pick different one');
            //   }
            // return res.redirect('/signup)

            return Promise.reject(
              'E-mail exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 charectors.'
    )
      .isLength({ min: 5 })

      .isAlphanumeric()
      .trim(), //-->>after this we can add which ever letters we want as a password by writing the built in methods
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        console.log('confimpasssword>>', value);
        if (value !== req.body.password) {
          throw new Error('Password didnot match');
        }
        return true;
      })
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getRest);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
