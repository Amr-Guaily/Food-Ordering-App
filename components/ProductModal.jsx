import { useState } from 'react';

const OrderModal = ({ setModal }) => {
  const [file, setFile] = useState(null);

  const fileHandler = async (e) => {
    const selectedFile = e.target.files[0];
    const validTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/jfif'];
    if (validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      window.alert('Please enter valid type (/png, /jpeg, /webp, /jfif)');
    }
  };

  // Upload image to cloudinary
  const cloudHandler = async (e) => {
    e.preventDefault();
    // GET Signature..
    const signatureRes = await fetch('/api/cloudinary').then((res) =>
      res.json()
    );

    const data = new FormData();
    data.append('file', file);
    data.append('api_key', '218536776417521');
    data.append('signature', signatureRes.signature);
    data.append('timestamp', signatureRes.timestamp);

    // Upload img to cloudinary
    const cloudinaryRes = await fetch(
      'https://api.cloudinary.com/v1_1/dkgxcys8h/image/upload',
      {
        method: 'POST',
        body: data,
      }
    ).then((res) => res.json());

    // next ...
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

          <button onClick={cloudHandler}>Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
