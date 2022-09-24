import Image from 'next/image';
import Link from 'next/link';
import { useCart } from 'context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  return (
    <div className="sticky top-0 h-16 bg-tranparent text-white flex items-center justify-between px-4 z-50 bg-main">
      <Link href="/">
        <h1 className=" font-cursive text-3xl font-semibold cursor-pointer">
          Pizza Home
        </h1>
      </Link>
      <Link href="/cart" passHref>
        <div className="relative mr-3 cursor-pointer">
          <Image src="/imgs/cart.png" width="30px" height="30px" alt="cart" />
          <div className="flex items-center justify-center absolute top-[-8px] right-[-10px] h-5 w-5 bg-white rounded-full text-black/40 font-semibold cursor-pointer">
            <span>{cart.length}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
