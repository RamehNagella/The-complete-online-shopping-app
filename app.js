/*

//WORKING WITH   M O N G O D B
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const sequelize = require('./util/database');

const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products').then(result=>{
// 	console.log(result);
// }).catch(err=>{
// 	console.log(err);0
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('64b776b7107221c6af045703')
    .then(user => {
      // req.user = user;
      // to have real user with which we can interact, create new user
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

//Now connect the connection between user and databse
//where do we want to use my user object? we will user this user object when creating a new product, when saving a product we want to store a reference to a user
//  in product.js model save() method or embed the entire user data
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// sequelize
//   .sync()
//   .then(result => {
//     console.log(result);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// console.log(typeof mongoConnect);
// app.listen(3000);

mongoConnect(client => {
  console.log('client>> ', client);
  // if()  -->>here we will insert Id taken from users collection from database
  app.listen(3000);
});
*/

//

//WORKING WITH  M O N G O O S E and COOKIES AND SESSIONS

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const errorController = require('./controllers/error');

// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://rameshnagella272:LKw3wpWK8R2y5sWw@cluster0.dkvik71.mongodb.net/shop';
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

//if we add csrrftoken here it will be rendered to all the pages and authenticated is also added
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  // throw new Error('Sync Dummy');
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      // throw new Error('Dummy');
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    //   .catch(err => console.log(err)); // this catch block will not fire if we don't find the user with this id
    // //it only fire if there are any technical issues ex.database is down or if user of this doesnot have sufficient permissions to exute this action
    .catch(err => {
      // throw new Error(err);
      // next();
      next(new Error(err));
    });
});

//Now connect the connection between user and databse
//where do we want to use my user object? we will user this user object when creating a new product, when saving a product we want to store a reference to a user
//  in product.js model save() method or embed the entire user data
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);
app.use(errorController.get404);

app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  // res.status(500).render('500', {
  //   pageTitle: 'Error!',
  //   path: '/500',
  //   isAuthenticated: req.session.isLoggedIn
  // });
});
mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log(' CONNECTED!!');
    // console.log('url result', result);
    // User.findOne().then(user => {
    //   if (!user) {
    //     const user = new User({
    //       name: 'Max',
    //       email: 'max@test.com',
    //       cart: {
    //         items: []
    //       }
    //     });
    //     user.save();
    //   }
    // });
    //because we created real user created in auth.js controller in sign up

    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
