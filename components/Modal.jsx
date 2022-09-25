import { useCart } from 'context/CartContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import reactDom from 'react-dom';

const Modal = ({ setModal }) => {
  const [orderData, setOrderData] = useState({
    customer: '',
    address: '',
  });
  const { total, setCart } = useCart();
  const router = useRouter();

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ ...orderData, total });
    fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({ ...orderData, total }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(`/orders/${data._id}`);
        // Clear Cart
        setCart([]);
        fetch('/api/cart', {
          method: 'PUT',
          body: JSON.stringify([]),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });
  };

  if (typeof window === 'object') {
    return reactDom.createPortal(
      <div className="fixed w-full h-full top-0 left-0 flex justify-center">
        {/* Backdrop */}
        <div className="bg-black/60 w-full h-full" />
        {/* Modal */}
        <div className="bg-white rounded-xl fixed w-[30rem] top-[30vh] shadow-md py-4 px-6">
          <p className="text-center text-2xl text-slate-700">
            You will pay{' '}
            <span className="text-3xl font-semibold">{total}$</span> after
            delivery
          </p>
          <form onSubmit={submitHandler} className="my-4">
            <div>
              <label
                className="capitalize text-slate-700 font-semibold"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                placeholder="e.g Jhon Doe"
                type="text"
                id="name"
                required
                name="customer"
                value={orderData.customer}
                onChange={changeHandler}
                className="block w-full outline-none border-b-2 pl-3 py-1 transition duration-300 hover:border-b-main focus:border-b-main"
              />
            </div>
            <div className="my-4">
              <label
                className="capitalize text-slate-700 font-semibold"
                htmlFor="name"
              >
                Adress
              </label>
              <input
                placeholder="e.g Elton st.212-33 LA"
                type="text"
                id="name"
                required
                name="address"
                value={orderData.address}
                onChange={changeHandler}
                className="block w-full outline-none border-b-2 pl-3 py-1 transition duration-300 hover:border-b-main focus:border-b-main"
              />
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setModal(false)}
                className="border-main border px-3 py-0.5 rounded-md text-slate-900"
              >
                Cancel
              </button>
              <button className="px-3 py-0.5 rounded-md text-white bg-main hover:brightness-90 transition duration-300">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.getElementById('portal')
    );
  }
  return null;
};

export default Modal;
