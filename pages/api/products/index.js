import dbConnect from 'lib/mongo';
import Product from 'models/Product';
const cloudinary = require('cloudinary').v2;

export default async function handler(req, res) {
  const { method } = req;

  // Connect to database
  await dbConnect();

  if (method === 'POST') {
    /**
     * ! How can our server trust the cloudinary response!?
     * A malicious user can send fake data, but he has no idea what our api_secret is.
     * The idea here: "There is no way to fake a signature if you don't have the api_secret".
     * We can combine public_id & version with our api_secret and generate what the signature should be.
     * then, we can compare the expected signature with the "req.body.signature", and only if they are equal we can trust the incoming data.
     */
    try {
      const expectedSignature = cloudinary.utils.api_sign_request(
        {
          public_id: req.body._id,
          version: req.body.version,
        },
        process.env.NEXT_PUPLIC_CLOUDINARY_SECRET
      );
      if (expectedSignature === req.body.signature) {
        const product = Product.create(req.body);
        res.status(201).json(product);
      } else {
        res.status(500).json('Malicious user trying to send fake data');
      }
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
