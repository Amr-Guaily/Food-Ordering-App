import dbConnect from 'lib/mongo';
import Cart from 'models/Cart';
import mongoose from 'mongoose';

export default async function hundler(req, res) {
  const { method } = req;
  mongoose.connect(process.env.MONGO_URL, () => {
    console.log('connected...');
  });

  if (method === 'GET') {
    try {
      const cartItems = await Cart.find();
      res.status(200).json(cartItems);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'POST') {
    try {
      const cartItem = await Cart.create(req.body);
      res.status(201).json(cartItem);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
