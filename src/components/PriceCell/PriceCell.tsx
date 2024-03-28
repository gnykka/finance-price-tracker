import React, { useEffect, useState } from 'react';

interface PriceCellProps {
  price: number;
}

const highlightTimeout = 1000;

const PriceCell: React.FC<PriceCellProps> = ({ price }) => {
  const [prevPrice, setPrevPrice] = useState(price);
  const [highlightClass, setHighlightClass] = useState('');

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null;

    if (price !== prevPrice) {
      const highlight = price > prevPrice ? 'bg-green-100' : 'bg-red-100';

      setHighlightClass(highlight);

      timerId = setTimeout(() => setHighlightClass(''), highlightTimeout);

      setPrevPrice(price);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
    };
  }, [price, prevPrice]);

  return (
    <td className="numeric">
      <span className={highlightClass}>${price.toFixed(4)}</span>
    </td>
  );
};

export default PriceCell;
