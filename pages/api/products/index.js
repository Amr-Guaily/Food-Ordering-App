import dbConnect from 'lib/mongo';
import Product from 'models/Product';

export default async function handler(req, res) {
  const { method } = req;

  // Connect to database
  await dbConnect();

  if (method === 'POST') {
    try {
      const product = Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'GET') {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
