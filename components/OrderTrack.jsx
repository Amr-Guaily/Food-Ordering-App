import Image from 'next/dist/client/image';
import { useReducer } from 'react';

const initialState = {
  payment: 'done',
  prepering: 'inprogress',
  onTheWay: 'undone',
  delivered: 'undone',
};

function reducer() {}

const OrderTrack = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div className={`flex flex-col items-center gap-1 ${state.payment}`}>
        <Image src="/imgs/paid.png" width="45px" height="45px" />
        <span>Payment</span>
        {state.payment === 'done' && (
          <Image src="/imgs/checked.png" width={20} height={20} />
        )}
      </div>
      <div className={`flex flex-col items-center gap-1 ${state.prepering}`}>
        <Image src="/imgs/bake.png" width="45px" height="45px" />
        <span>Prepering</span>
        {state.prepering === 'done' && (
          <Image src="/imgs/checked.png" width={20} height={20} />
        )}
      </div>{' '}
      <div className={`flex flex-col items-center gap-1 ${state.onTheWay}`}>
        <Image src="/imgs/bike.png" width="45px" height="45px" />
        <span>On the way</span>
        {state.onTheWay === 'done' && (
          <Image src="/imgs/checked.png" width={20} height={20} />
        )}
      </div>{' '}
      <div className={`flex flex-col items-center gap-1 ${state.delivered}`}>
        <Image src="/imgs/delivered.png" width="45px" height="45px" />
        <span>Delivered</span>
        {state.delivered === 'done' && (
          <Image src="/imgs/checked.png" width={20} height={20} />
        )}
      </div>{' '}
    </>
  );
};

export default OrderTrack;
