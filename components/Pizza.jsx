const Pizza = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-md bg-white shadow-lg cursor-pointer">
      <div className="w-full ">
        <img
          src="https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-full object-cover max-h-[220px]"
        />
      </div>

      <div className="p-3 text-center">
        <h5 className="text-lg text-red-600 font-semibold">FIORI DI ZUCCA</h5>
        <span className="font-semibold text-gray-800 block my-2">$19.90</span>
        <p className="text-gray-600 leading-5 mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
};

export default Pizza;
