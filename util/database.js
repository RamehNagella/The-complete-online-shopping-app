// const mysql = require('mysql2');

// const pool = mysql.createPool({
// 	host:'localhost',
// 	user:'root',
// 	database:'node-compleate',
// 	password:'R7$1st@nce_Mysql2023!'
// })
// module.exports = pool.promise();

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//   'node-compleate',
//   'root',
//   'R7$1st@nce_Mysql2023!',
//   {
//     dialect: 'mysql',
//     host: 'localhost'
//   }
// );
// module.exports = sequelize;

// LKw3wpWK8R2y5sWw passwod cluster
// mongodb+srv://rameshnagella272:<password>@cluster0.dkvik71.mongodb.net/?retryWrites=true&w=majority
//connecting url to mongodb
/*

//      USING  ***  M O  N  G  O    D  B   ***

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

//this method is connecting for database then storing the connection to the database(_db) therefore this method will keep on running
const mongoConnect = calllback => {
  MongoClient.connect(
    'mongodb+srv://rameshnagella272:LKw3wpWK8R2y5sWw@cluster0.dkvik71.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected!');

      _db = client.db(); //-->>STORing a connection to the database in the db variable
      calllback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

//this method is where we return access to that connected database if it exists
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// module.exports = mongoConnect;
//connect to databasee
// const mongoConnect = calllback => {
//like this we will connect
// };
*/
