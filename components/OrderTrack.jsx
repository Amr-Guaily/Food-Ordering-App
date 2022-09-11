import Image from 'next/image';
import { useReducer } from 'react';

const initialState = {
  payment: 'done',
  prepering: 'inprogress',
  onTheWay: 'undone',
  delivered: 'undone',
};

function reducer() {}

const OrderTrack = ({ icon }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className={`flex flex-col items-center gap-1 ${state[icon.name]}`}>
      <Image src={icon.src} width="45px" height="45px" />
      <span>{icon.name}</span>

      {state[icon.name] === 'done' && (
        <Image src="/imgs/checked.png" width={20} height={20} />
      )}
    </div>
  );
};

export default OrderTrack;
