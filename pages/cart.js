import Link from 'next/link';
import Image from 'next/image';
import { useCart } from 'context/CartContext';
import { useState } from 'react';
import { OrderModal } from 'components/index';

const ShoppingCart = () => {
  const { cart, deleteHandler, total } = useCart();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {cart.length <= 0 ? (
        <Link href="/">
          <p className="text-xl font-semibold text-gray-800 text-center mt-20 cursor-pointer hover:underline">
            You don't have any pizza yet, start add more..
          </p>
        </Link>
      ) : (
        <div className="w-[95%] md:w-[80%] mx-auto mt-8">
          <table className="relative text-left w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product._id}>
                  <td className="relative">
                    <Image
                      width="60"
                      height="60"
                      className="rounded-full"
                      src={product.img}
                      objectFit="contain"
                      alt="product-img"
                    />
                    <span
                      onClick={() => deleteHandler(product._id)}
                      className="absolute w-4 h-4 cursor-pointer bg-red-400 top-0 left-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <g fill="#FFFFFF">
                          <path d="M19.5 4.5c-.8-.8-2.2-.8-3 0L12 9 7.5 4.5c-.8-.8-2.2-.8-3 0-.8.8-.8 2.2 0 3L9 12l-4.5 4.5c-.8.8-.8 2.2 0 3 .8.8 2.2.8 3 0L12 15l4.5 4.5c.8.8 2.2.8 3 0 .8-.8.8-2.2 0-3L15 12l4.5-4.5c.8-.8.8-2.2 0-3z"></path>
                        </g>
                      </svg>
                    </span>
                  </td>
                  <td className="cart-td">{product.name}</td>
                  <td className="cart-td">
                    {product.extras?.map((opt, idx) => (
                      <span className="block text-sm" key={idx}>
                        {opt}
                      </span>
                    ))}
                  </td>
                  <td className="cart-td">${product.price}</td>
                  <td className="cart-td">{product.quantity}</td>
                  <td className="cart-td">${product.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between py-3 border-t-2 border-t-gray-500 mt-6">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <span className="text-lg">subTotal:</span>
              <span className=" underline font-bold">${total}</span>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-main font-semibold px-3 py-1 text-white rounded-md hover:brightness-90"
            >
              Checkout
            </button>
          </div>
          {showModal && <OrderModal setModal={setShowModal} />}
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
