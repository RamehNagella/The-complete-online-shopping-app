// apikey from mailchemp>>>  8512be000af4a985194901ca90df80f7-us21
//mailChemp userId =945692364356
// mailchemp client secret = 0c6861ed4ff3f7fd1564eb41d0f8b80d4c6bce71adb2243cba
// 0c6861ed4ff3f7fd1564eb41d0f8b80d4c6bce71adb2243cba

const crypto = require('crypto');

const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const { validationResult } = require('express-validator');

// const sendGridTransport = require('axios');
const User = require('../models/user');

// const api_key = '8512be000af4a985194901ca90df80f7-us21';

// const listId = '945692364356';
// const dataCenter = 'us21';

// const endpoint = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}`;

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: '8512be000af4a985194901ca90df80f7-us21'
    }
  })
);

exports.getLogin = (req, res, next) => {
  // console.log(req.get('Cookie'));
  // const isLoggedIn =
  //   req.get('Cookie').split(';')[1].trim().split('=')[1] === 'true';
  // console.log('llll', isLoggedIn);
  // console.log(req.session.isLoggedIn);
  console.log('flasseroor>>', req.flash('error'));
  let message = req.flash('error');
  // console.log('?????', message); //1 ------------?????????
  // let message = req.flash('error');
  console.log('////<<< ', message);
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/path',
    pageTitle: 'Login',
    errorMessage: req.flash('error'),
    oldInput: {
      email: '',
      password: ''
    },
    validationErrors: []
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'SignUp',
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
};

exports.postLogin = (req, res, next) => {
  // req.isLoggedIn = true;
  // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
  // req.session.isLoggedIn = true;

  //find the user by using email

  const email = req.body.email;
  const password = req.body.password;
  // User.findById('64b8a824c09b99b59870fa4f')
  // const errors = validationResult(req);
  const errors = validationResult(req);

  console.log('1111>> ', errors.array());

  if (!errors.isEmpty()) {
    console.log('postLogoutValidatonErro', errors.array());
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password
      },
      validationErrors: errors.array()
    });
  }
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Enter already signed userAddress');
        return res.status(422).render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: errors.array()[0].msg,
          oldInput: {
            email: email,
            password: password
          },
          validationErrors: []
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          // req.flash('error', 'Enter correct password.');
          // res.redirect('/login');
          return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: errors.array()[0].msg,
            oldInput: {
              email: email,
              password: password
            },
            validationErrors: []
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => {
      // console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('errosArray>> ', errors.array());
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Sign Up',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword
      },
      validationErrors: errors.array()
    });
  }
  // User.findOne({ email: email })
  //   .then(userDoc => {
  //     console.log('signedUpuserDoc>>:', userDoc);
  //     if (userDoc) {
  //       req.flash('error', 'E-Mail exist already,please pick a different one.');
  //       return res.redirect('/signup');
  //     }

  //the above filter can be removed because for email validation we have written validator in auth.js router

  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      console.log('hashedPassword: ', hashedPassword);
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(result => {
      console.log('signUpUser: ', result);
      res.redirect('/login');
      return transporter.sendMail({
        to: email,
        from: 'shop@node-complete.com',
        subject: 'Signup succeded!',
        html: '<h1> You successfully signed up!<h1>'
      });
    })
    .catch(err => {
      console.log(err);
    })
    .catch(err => {
      // console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
  // res.redirect('/');
};

exports.getRest = (req, res, next) => {
  let message = req.flash('error');
  console.log('@@@@', req.flash('error'));
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log('>>>>: ', err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', 'No account with that email found.');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        console.log('gotUserToResetpassword ', result);
        res.redirect('/');

        //send the email to user to reset password
        transporter.sendMail({
          to: req.body.email,
          from: 'shop@node-complete.com',
          subject: 'Password reset',
          html: `
            <p> You requested a password reset </p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password</p>
          `
        });
      })
      .catch(err => {
        // console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: DataTransfer.now() }
  })
    .then(user => {
      let message = req.flash('error');
      console.log('#### ', req.flash('error'));
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => {
      // console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Data.noe() },
    _id: userId
  })
    .then(user => {
      //assign new password to the user
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      console.log('newlysetPassword: ', hashedPassword);
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      console.log('passwordChangedResult: ', result);
      res.redirect('/login');
    })
    .catch(err => {
      // console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

//for any non-get requests this(csurf) package will look for the existance of a csrf token in your views
// in the request basically re.body
