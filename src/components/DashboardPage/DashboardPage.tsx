import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Ticker } from '../../types';
import { StoreContext } from '../../storeContext';

const DashboardPage: React.FC = observer(() => {
  const store = useContext(StoreContext);

  useEffect(() => {
    const data = [
      { id: 'AAPL', price: 150 },
      { id: 'GOOGL', price: 100 },
    ];

    data.forEach((v) => {
      store.updatePrice(v.id, v.price);
    });
  }, [store]);

  return (
    <div>
      <h1>List of Tickers</h1>
      {store.tickers.map((ticker: Ticker) => (
        <div key={ticker.id}>
          <Link to={`/${ticker.id}`}>{ticker.id} | {ticker.name} | ${ticker.price}</Link>
        </div>
      ))}
    </div>
  );
});

export default DashboardPage;
