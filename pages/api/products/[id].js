import Product from 'models/Product';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGO_URL, () => {
    console.log('connected...');
  });

  const {
    method,
    query: { id },
  } = req;

  if (method === 'GET') {
    try {
      const doc = await Product.findById(id);
      res.status(200).json(doc);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
