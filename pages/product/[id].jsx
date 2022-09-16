import { useCart } from 'context/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

const dummy_data = {
  id: 1,
  imgUrl:
    'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  name: 'CAMPAGNOLA',
  price: [19.9, 23.9, 27.9],
  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.',
};

const PizzaDetails = ({ pizzaData }) => {
  const [price, setPrice] = useState({
    original: pizzaData.prices[0],
    additional: 0,
  });
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();
  const { setCart } = useCart();
  const { title, prices, desc, extraOptions } = pizzaData;

  const changeHandler = (e, extraOpt) => {
    const { checked, value } = e.target;
    if (checked) {
      setPrice((prev) => ({ ...prev, additional: prev.additional + +value }));
      setExtras((prev) => [...prev, extraOpt]);
    } else {
      setPrice((prev) => ({ ...prev, additional: prev.additional - +value }));
      setExtras((prev) => prev.filter((item) => item !== extraOpt));
    }
  };

  // ADD Piza to your cart
  const submitHandler = () => {
    const orderData = {
      name: pizzaData.title,
      img: dummy_data.imgUrl,
      extras,
      price: price.original + price.additional,
      quantity,
      total: (price.original + price.additional) * quantity,
    };
    fetch('http://localhost:3000/api/cart', {
      method: 'POST',
      body: JSON.stringify(orderData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setCart((prev) => [...prev, orderData]);
      router.push('/cart');
    });
  };

  return (
    <div className="w-[95%] md:w-[80%] mx-auto flex flex-col sm:flex-row gap-6 justify-center mt-[3rem] pb-20">
      <div className="max-w-[450px] mx-auto">
        <img
          src={dummy_data.imgUrl}
          className="object-cover rounded-md w-full max-h-[450px]"
          alt="pizza-image"
        />
      </div>

      {/* Right Side */}
      <div className="flex-1 px-4 text-center sm:text-start">
        <h1 className="font-bold text-gray-800 text-2xl tracking-wide">
          {title}
        </h1>
        <span className="font-bold text-red-600 block my-2 text-lg underline">
          ${price.original + price.additional}
        </span>
        <p className="text-gray-500 leading-5">{desc}</p>

        {/* Choose Size */}
        <div className="my-4">
          <h2 className="font-bold text-gray-800 text-xl">Choose The Size</h2>
          <div className="flex justify-center sm:justify-start gap-14 mt-6">
            <div
              className="relative cursor-pointer"
              onClick={() =>
                setPrice((prev) => ({ ...prev, original: prices[0] }))
              }
            >
              <Image src="/imgs/size.png" width="30px" height="30px" alt="" />
              <span className="absolute px-2 top-[-8px] left-[50%] text-sm text-white rounded-xl bg-green-600 font-semibold">
                Small
              </span>
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() =>
                setPrice((prev) => ({ ...prev, original: prices[1] }))
              }
            >
              <Image src="/imgs/size.png" width="40px" height="40px" alt="" />
              <span className="absolute px-2  top-[-8px] left-[50%] text-sm text-white rounded-xl bg-green-600 font-semibold">
                Medium
              </span>
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() =>
                setPrice((prev) => ({ ...prev, original: prices[2] }))
              }
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
          {}
          <div className="flex items-center justify-center sm:justify-start flex-wrap gap-3 my-4">
            {extraOptions.map((option) => (
              <div key={option._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={option.text}
                  value={option.price}
                  onChange={(e) => changeHandler(e, option.text)}
                  className="w-4 h-4"
                />
                <label htmlFor={option._id}>{option.text}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-8">
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="bg-white border py-1 outline-none pl-2 w-[60px]"
          />
          <button
            onClick={submitHandler}
            className="bg-main px-2 py-1 text-white rounded-r-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetails;

export async function getServerSideProps({ params }) {
  const doc = fetch(`http://localhost:3000/api/products/${params.id}`).then(
    (res) => res.json()
  );

  return {
    props: {
      pizzaData: await doc,
    },
  };
}
