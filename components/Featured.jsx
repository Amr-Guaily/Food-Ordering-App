import { useState } from 'react';
import Image from 'next/image';
const IMAGES = [
  '/imgs/featured.png',
  '/imgs/featured2.png',
  '/imgs/featured3.png',
];

const Featured = () => {
  const [index, setIndex] = useState(0);

  function nextIndex() {
    setIndex((prev) => checkIndex(prev + 1));
  }

  function prevIndex() {
    setIndex((prev) => checkIndex(prev - 1));
  }

  function checkIndex(idx) {
    if (idx > IMAGES.length - 1) return 0;
    if (idx < 0) return IMAGES.length - 1;
    return idx;
  }

  return (
    <div className="relative h-[26rem] md:[32rem] lg:h-screen bg-main mt-[-4rem] overflow-hidden ">
      <div
        className="absolute top-[50%] left-3 cursor-pointer z-10"
        onClick={prevIndex}
      >
        <Image src="/imgs/arrowl.png" width="40px" height="40px" />
      </div>

      <div className="w-[300vw] h-full flex">
        {IMAGES.map((img) => (
          <div
            className="relative w-screen h-full transition-all duration-1000 ease-in-out"
            key={img}
            style={{ transform: `translateX(${-100 * index}vw)` }}
          >
            <Image src={img} layout="fill" priority objectFit="contain" />
          </div>
        ))}
      </div>

      <div
        className="absolute top-[50%] right-3 cursor-pointer"
        onClick={nextIndex}
      >
        <Image src="/imgs/arrowr.png" width="40px" height="40px" />
      </div>
    </div>
  );
};

export default Featured;
