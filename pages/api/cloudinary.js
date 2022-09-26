const cloudinary = require('cloudinary').v2;

export default function handler(req, res) {
  // If you are making direct calls to "Cloudinary API", You need to generate a signature manually..
  if (req.method === 'GET') {
    // A timestamp is needed to generate signature
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      process.env.NEXT_PUPLIC_CLOUDINARY_SECRET
    );

    res.status(200).json({ timestamp, signature });
  }
}
