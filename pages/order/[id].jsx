import { OrderTrack } from '../../components/index';
// const ICONS = [
//   { name: 'Payment', src: '/imgs/paid.png' },
//   { name: 'Prepering', src: '/imgs/bake.png' },
//   { name: 'On the way', src: '/imgs/bike.png' },
//   { name: 'Delivered', src: '/imgs/delivered.png' },
// ];

const Order = () => {
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
              <td>129837819237</td>
              <td>Jhon Doe</td>
              <td>Elton st. 212-33 LA</td>
              <td>$79.80</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <div className="flex justify-between sm:w-[90%] lg:w-[70%]">
          <OrderTrack />
        </div>
      </div>

      {/* Right Side */}
      <div className=" bg-black/80 text-white p-8 mt-10 lg:mt-0 rounded-md text-start lg:w-[300px]">
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
      </div>
    </div>
  );
};

export default Order;
