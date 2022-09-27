import { useState } from 'react';

const OrderModal = ({ setModal }) => {
  const [file, setFile] = useState(null);
  const [extra, setExtra] = useState({
    text: '',
    price: '',
  });
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    prices: [],
    extraOptions: [],
  });

  const fileHandler = async (e) => {
    const selectedFile = e.target.files[0];
    const validTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/jfif'];
    if (validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      window.alert('Please enter valid type (/png, /jpeg, /webp, /jfif)');
    }
  };

  const changeHandler = (e) => {
    const { name, value, id } = e.target;
    if (name === 'prices') {
      const curr = formData.prices;
      curr[id] = value;
      setFormData((prev) => ({
        ...prev,
        prices: curr,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const extraHandler = () => {
    if (!extra.text || !extra.price) return;

    const curr = formData.extraOptions;
    curr.push(extra);
    setFormData((prev) => ({
      ...prev,
      extraOptions: curr,
    }));
    setExtra({
      text: '',
      price: '',
    });
  };

  // Upload product img to cloudinary
  const cloudHandler = async () => {
    return new Promise(async (resolve) => {
      // get signature..
      const signatureRes = await fetch('/api/cloudinary').then((res) =>
        res.json()
      );

      const data = new FormData();
      data.append('file', file);
      data.append('api_key', '218536776417521');
      data.append('signature', signatureRes.signature);
      data.append('timestamp', signatureRes.timestamp);

      const cloudinaryRes = await fetch(
        'https://api.cloudinary.com/v1_1/dkgxcys8h/image/upload',
        {
          method: 'POST',
          body: data,
        }
      ).then((res) => res.json());

      // reslove promise with cloudinbary response
      resolve(cloudinaryRes);
    });
  };

  const submitHandler = async () => {
    // waiting for upload product img to cloudinary
    const data = await cloudHandler();
    console.log(data);

    // next..
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 flex justify-center">
      {/* Backdrop */}
      <div
        className="bg-black/60 w-full h-full"
        onClick={() => setModal(false)}
      />
      {/* Modal */}
      <div className="bg-white rounded-xl fixed w-[35rem] top-[25vh] shadow-md py-4 px-6">
        <form>
          <input type="file" onChange={fileHandler} />
          <div className="my-4">
            <label
              className="capitalize text-slate-700 font-semibold"
              htmlFor="name"
            >
              Title
            </label>
            <input
              placeholder="e.g Pizza Name"
              type="text"
              id="title"
              required
              name="title"
              value={formData.title}
              onChange={changeHandler}
              className="input-field"
            />
          </div>
          <div className="my-4">
            <label
              className="capitalize text-slate-700 font-semibold"
              htmlFor="desc"
            >
              Description
            </label>
            <textarea
              id="desc"
              required
              placeholder="Describe your pizza..."
              name="desc"
              value={formData.desc}
              onChange={changeHandler}
              className="input-field"
            />
          </div>
          {/* Prices */}
          <div className="my-4">
            <label className="capitalize text-slate-700 font-semibold">
              Prices
            </label>
            <div className="flex items-center gap-6">
              <input
                type="number"
                className="input-field"
                placeholder="Small"
                id="0"
                name="prices"
                min={0}
                onChange={changeHandler}
              />
              <input
                type="number"
                className="input-field"
                placeholder="Medium"
                id="1"
                name="prices"
                min={0}
                onChange={changeHandler}
              />
              <input
                type="number"
                className="input-field"
                placeholder="Large"
                id="2"
                name="prices"
                min={0}
                onChange={changeHandler}
              />
            </div>
          </div>
          {/* Extra Options */}
          <div className="flex gap-4 mt-6 mb-3">
            <input
              type="text"
              className="input-field flex-1"
              placeholder="extra"
              value={extra.text}
              onChange={(e) =>
                setExtra((prev) => ({ ...prev, text: e.target.value }))
              }
            />
            <input
              type="number"
              className="input-field basis-1/5"
              placeholder="price"
              value={extra.price}
              min={0}
              onChange={(e) =>
                setExtra((prev) => ({ ...prev, price: e.target.value }))
              }
            />
            <button
              type="button"
              className="basis-1/6 px-3 rounded-md text-white bg-green-500 hover:brightness-90 transition duration-300"
              onClick={extraHandler}
            >
              Add
            </button>
          </div>
          <div className="flex items-center flex-wrap gap-3 ml-4">
            {formData.extraOptions.map((opt) => (
              <div
                key={opt.text}
                className="bg-gray-300 inline px-3 py-0.5 font-semibold rounded-md text-slate-700"
              >
                {opt.text}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-10 block ml-auto px-3 py-0.5 rounded-md text-white bg-main hover:brightness-90 transition duration-300"
            onClick={submitHandler}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
