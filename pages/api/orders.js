import Order from 'models/Order';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const { method } = req;
  mongoose.connect(process.env.NEXT_PUPLIC_MONGO_URL);

  if (method === 'POST') {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === 'GET') {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
