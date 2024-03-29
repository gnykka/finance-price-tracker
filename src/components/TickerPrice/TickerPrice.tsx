import React, { useEffect, useState } from 'react';

type TickerPriceProps = {
  price: number;
}

const highlightTimeout = 1000;

const TickerPrice: React.FC<TickerPriceProps> = ({ price }) => {
  const [prevPrice, setPrevPrice] = useState(price);
  const [highlightClass, setHighlightClass] = useState('');

  // Breafly highlight the value: in red if it goes down and in green — if up
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null;

    // If price changed, save the highlight class, timer to remove it, and new price
    if (price !== prevPrice) {
      const highlight = price > prevPrice ? 'bg-green-100' : 'bg-red-100';

      setHighlightClass(highlight);

      timerId = setTimeout(() => setHighlightClass(''), highlightTimeout);

      setPrevPrice(price);
    }

    // Remove the timeout if data changed or the component will be unmounted
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [price, prevPrice]);

  return (
    <span className={highlightClass}>${price.toFixed(4)}</span>
  );
};

export default TickerPrice;
