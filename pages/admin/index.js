import { useState } from 'react';
import { ProductModal } from 'components/index';
import dbConnect from 'lib/mongo';
import Product from 'models/Product';
import Order from 'models/Order';
const jwt = require('jsonwebtoken');

const Dashboard = ({ products, orders }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="px-8 py-6">
      <button
        className=" outline-none px-4 py-1 bg-green-600 hover:brightness-95 text-white font-semibold rounded-lg"
        onClick={() => setShowModal(true)}
      >
        Add New Pizza
      </button>
      {showModal && <ProductModal setModal={setShowModal} />}
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  try {
    // Trust User
    jwt.verify(req.cookies.adminToken, process.env.NEXT_PUPLIC_JWTSECRET);

    // connect to database
    await dbConnect();

    // Fetch Products
    const productsDocs = await Product.find({}, { __v: 0 }, { lean: true });
    const products = productsDocs.map((itm) => ({
      ...itm,
      extraOptions: itm.extraOptions.map((opt) =>
        JSON.parse(JSON.stringify(opt))
      ),
      _id: JSON.parse(JSON.stringify(itm._id)),
    }));

    // Fetch Orders
    const ordersDocs = await Order.find(
      {},
      { __v: 0, updatedAt: 0 },
      { lean: true }
    );
    const orders = ordersDocs.map((itm) => ({
      ...itm,
      createdAt: JSON.parse(JSON.stringify(itm.createdAt)),
      _id: JSON.parse(JSON.stringify(itm._id)),
    }));

    return {
      props: {
        products,
        orders,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
}
