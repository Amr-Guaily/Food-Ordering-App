import { Pizza } from './index';

const PizzaGrid = ({ products }) => {
  return (
    <div className="mt-8 pb-28 w-[90%] mx-auto ">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-3">
        The best pizza in town
      </h1>
      <p className="text-center tracking-tight text-gray-500 leading-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae illo
        voluptates, soluta asperiores aspernatur aperiam! dolor sit amet,
        consectetur adipisicing elit
      </p>
      <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {products?.map((product) => (
          <Pizza key={product._id} pizzaData={product} />
        ))}
      </div>
    </div>
  );
};

export default PizzaGrid;
