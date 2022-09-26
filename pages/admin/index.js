import { useState } from 'react';
import { ProductModal } from 'components/index';
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
    // Fetch Data
    const products = await fetch('http://localhost:3000/api/products').then(
      (res) => res.json()
    );
    const orders = await fetch('http://localhost:3000/api/orders').then((res) =>
      res.json()
    );
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
