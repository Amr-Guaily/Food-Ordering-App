import dbConnect from 'lib/mongo';
import Product from 'models/Product';

export default async function handler(req, res) {
  await dbConnect();

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
