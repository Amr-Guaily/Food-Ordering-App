const jwt = require('jsonwebtoken');

const Dashboard = ({ products }) => {
  return <div>index</div>;
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
    const products = await fetch('/api/products').then((res) => res.json());
    const orders = await fetch('/api/orders').then((res) => res.json());
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
