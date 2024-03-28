import React, { useEffect, useState } from 'react';

interface PriceCellProps {
  price: number;
}

const highlightTimeout = 1000;

const PriceCell: React.FC<PriceCellProps> = ({ price }) => {
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
    <td className="numeric">
      <span className={highlightClass}>${price.toFixed(4)}</span>
    </td>
  );
};

export default PriceCell;
