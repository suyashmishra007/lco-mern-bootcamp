const mongoose = requrie("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductCardSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema(
  {
    products: [ProductCardSchema],
    transaction_id: {},
    amount: Number,
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timeStamps: true }
);

const Order = mongoose.model("Order", orderSchema);
const ProductCard = mongoose.model("ProductCard", ProductCardSchema);

module.exports = { Order, ProductCard };
