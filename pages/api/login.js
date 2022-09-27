const jwt = require('jsonwebtoken');
import cookie from 'cookie';

export default function handler(req, res) {
  const { name, password } = req.body;
  const token = jwt.sign({ rule: 'admin' }, 'ngjklsdfaauisdhbvancdskfhsnaopgf');

  if (req.method === 'POST') {
    if (name === 'admin' && password === '12301230#') {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('adminToken', token, {
          httpOnly: true,
          maxAge: 60 * 60,
          // Only attached to same site requests
          sameSite: 'strict',
          // Available everywhere within the site
          path: '/',
        })
      );
      // res.json({ status: 'success', token });
      res.status(200).json('Success');
    } else {
      res.status(400).json('failure..');
    }
  }
}
