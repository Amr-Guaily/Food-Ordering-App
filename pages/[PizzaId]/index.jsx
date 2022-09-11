import Image from 'next/image';
import { useState } from 'react';

const dummy_data = {
  id: 1,
  imgUrl:
    'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  name: 'CAMPAGNOLA',
  price: [19.9, 23.9, 27.9],
  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.',
};

const PizzaDetails = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-[90%] md:w-[75%] mx-auto flex flex-col lg:flex-row gap-6 justify-center mt-[3rem] pb-20">
      <div className="lg:w-[50%] lg:max-w-[450px]">
        <img
          src={dummy_data.imgUrl}
          className="object-cover rounded-md w-full max-h-[550px]"
          alt="pizza-image"
        />
      </div>

      {/* Right Side */}
      <div className="flex-1 p-4 text-center lg:text-start">
        <h1 className="font-bold text-gray-800 text-2xl tracking-wide">
          {dummy_data.name}
        </h1>
        <span className="font-bold text-red-600 block my-2 text-lg underline">
          ${dummy_data.price[index]}
        </span>
        <p className="text-gray-500 leading-5">{dummy_data.desc}</p>

        {/* Choose ize */}
        <div className="my-4">
          <h2 className="font-bold text-gray-800 text-xl">Choose The Size</h2>
          <div className="flex justify-center lg:justify-start gap-14 mt-6">
            <div
              className="relative cursor-pointer"
              onClick={() => setIndex(0)}
            >
              <Image src="/imgs/size.png" width="30px" height="30px" alt="" />
              <span className="absolute px-2 top-[-8px] left-[50%] text-sm text-white rounded-xl bg-green-600 font-semibold">
                Small
              </span>
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => setIndex(1)}
            >
              <Image src="/imgs/size.png" width="40px" height="40px" alt="" />
              <span className="absolute px-2  top-[-8px] left-[50%] text-sm text-white rounded-xl bg-green-600 font-semibold">
                Medium
              </span>
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => setIndex(2)}
            >
              <Image src="/imgs/size.png" width="50px" height="50px" alt="" />
              <span className="absolute px-2 top-[-8px] left-[50%] text-sm  text-white rounded-xl bg-green-600 font-semibold flex">
                Large
              </span>
            </div>
          </div>
        </div>

        {/* Additional Ingredients */}
        <div>
          <h2 className="font-bold text-gray-800 text-xl">
            Choose Additional Ingredients
          </h2>
          <div className="flex items-center flex-wrap gap-3 my-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="double"
                name="double"
                className="w-4 h-4"
              />
              <label htmlFor="double">Double Ingredients</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="w-4 h-4"
                type="checkbox"
                id="cheese"
                name="cheese"
              />
              <label htmlFor="cheese">Extra Cheese</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="w-4 h-4"
                type="checkbox"
                id="spicy"
                name="spicy"
              />
              <label htmlFor="spicy">Spicy Sauce</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="w-4 h-4"
                type="checkbox"
                id="garlic"
                name="garlic"
              />
              <label htmlFor="garlic">Garlic Sauce</label>
            </div>
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-8">
          <input
            type="number"
            defaultValue={1}
            className="bg-white border py-1 outline-none pl-2 w-[60px]"
          />
          <button className="bg-main px-2 py-1 text-white rounded-r-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetails;
