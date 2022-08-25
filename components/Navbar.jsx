import Image from 'next/image';
const Navbar = () => {
  return (
    <div className="sticky h-16 bg-tranparent text-white flex items-center justify-between px-4 z-50 bg-main">
      <h1 className=" font-cursive text-3xl font-semibold">Pizza Home</h1>
      <div className="relative mr-3 cursor-pointer">
        <Image src="/imgs/cart.png" width="30px" height="30px"></Image>
        <div className="flex items-center justify-center absolute top-[-8px] right-[-10px] h-5 w-5 bg-white rounded-full text-black/40 font-semibold cursor-pointer">
          <span>2</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
