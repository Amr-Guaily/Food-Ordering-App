import Link from 'next/link';

const Pizza = ({ pizzaData }) => {
  return (
    <Link href={`/product/${pizzaData._id}`} passHref>
      <div className="flex flex-col overflow-hidden rounded-md bg-white shadow-lg cursor-pointer">
        <div className="w-full h-[200px]">
          <img
            src={pizzaData.img}
            alt="pizza-img"
            className="w-full object-cover h-full max-h-full"
          />
        </div>

        <div className="p-3 text-center">
          <h5 className="text-lg text-red-600 font-semibold">
            {pizzaData.title}
          </h5>
          <span className="font-semibold text-gray-800 block my-2">
            ${pizzaData.prices[0]}
          </span>
          <p className="text-gray-600 leading-5 mb-3">
            {pizzaData.desc.slice(0, 80)}...
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Pizza;
