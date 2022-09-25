import dbConnect from 'lib/mongo';
import Order from 'models/Order';
import { OrderTrack } from '../../components/index';
const ICONS = [
  { name: 'payment', src: '/imgs/paid.png' },
  { name: 'prepering', src: '/imgs/bake.png' },
  { name: 'onTheWay', src: '/imgs/bike.png' },
  { name: 'delivered', src: '/imgs/delivered.png' },
];

const OrderDetails = ({ order }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-[95%] sm:w-[80%] mx-auto mt-16">
      {/* Left Side */}
      <div className="flex-1 flex flex-col gap-10">
        <table className="text-left w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{order._id.slice(0, 8)}...</td>
              <td>{order.customer}</td>
              <td>{order.address}</td>
              <td>${order.total}</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <div className="flex justify-between sm:w-[90%] lg:w-[70%]">
          {ICONS.map((icon) => (
            <OrderTrack key={icon.src} icon={icon} />
          ))}
        </div>
      </div>

      {/* Right Side */}
      {/* <div className=" bg-black/80 text-white p-8 mt-10 lg:mt-0 rounded-md text-start lg:w-[300px]">
        <h1 className="uppercase text-xl font-semibold mb-5">Cart Total</h1>
        <h3 className="font-semibold text-lg">
          Subtotal: $<span className=" text-md font-light">102.50</span>
        </h3>
        <h3 className="font-semibold text-lg">
          Discount: $<span className=" text-md font-light">0.00</span>
        </h3>
        <h3 className="font-semibold text-lg">
          Total: $<span className=" text-md font-light">102.50</span>
        </h3>
        <button className="py-1 mt-5 bg-white text-green-600 text-lg font-semibold w-full rounded-md hover:brightness-90">
          PAID
        </button>
      </div> */}
    </div>
  );
};

export default OrderDetails;

// Fetch Order
export async function getServerSideProps({ params }) {
  await dbConnect();
  const doc = await Order.findById(
    params.id,
    { updatedAt: 0, __v: 0 },
    { lean: true }
  );
  const order = {
    ...doc,
    _id: JSON.parse(JSON.stringify(doc._id)),
    createdAt: JSON.parse(JSON.stringify(doc.createdAt)),
  };

  return {
    props: {
      order,
    },
  };
}
