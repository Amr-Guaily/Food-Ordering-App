import dbConnect from 'lib/mongo';
import Cart from 'models/Cart';

export default async function hundler(req, res) {
  const { method } = req;
  await dbConnect();

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

  // Delete Cart Item
  if (method === 'DELETE') {
    try {
      const filteredItems = await Cart.findByIdAndDelete(req.body);
      res.status(200).json(filteredItems);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Clear Cart
  if (method === 'PUT') {
    try {
      await Cart.deleteMany({});
      res.status(200).json('Clear Cart');
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
