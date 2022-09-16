import Link from 'next/link';
import Image from 'next/image';
import { useCart } from 'context/CartContext';

const ShoppingCart = () => {
  const { cart } = useCart();

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
                <tr key={product._id} className="">
                  <td>
                    <Image
                      width="60"
                      height="60"
                      className="rounded-full"
                      src={product.img}
                      objectFit="contain"
                    />
                  </td>
                  <td className="cart-td">{product.name}</td>
                  <td className="cart-td">
                    {product.extras.map((opt) => (
                      <span className="block text-sm" key={opt}>
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

          <div className="flex items-center gap-2 py-3 font-semibold text-slate-700 border-t-2 border-t-gray-500 mt-6">
            <span className="text-lg">subTotal:</span>
            <span className=" underline font-bold">$</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
