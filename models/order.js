// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const orderShcema = new Schema({
//   products: [
//     {
//       product: { type: Object, required: true },
//       quantity: { type: Number, required: true }
//     }
//   ],
//   user: {
//     name: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       ref: 'User'
//     }
//   }
// });
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderShcema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  user: {
    email: {
      type: String,
      required: true
    },

    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
});

module.exports = mongoose.model('Orders', orderShcema);
