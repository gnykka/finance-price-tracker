import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../DashboardPage';
import DetailsPage from '../DetailsPage';
import NotFoundPage from '../NotFoundPage';
import { Ticker } from '../../types';
import { StoreContext } from '../../storeContext';
import { getTickerQuote } from '../../apiClient';

const App: React.FC = () => {
  const store = useContext(StoreContext);

  useEffect(() => {
    const ids: string[] = store.tickers.map((t: Ticker) => t.id);

    ids.forEach((id) => {
      getTickerQuote(id).then((res) => console.log(res));
    });
    /*
    data.forEach((v) => {
      store.updatePrice(v.id, v.price);
    });
    */
  }, [store]);

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/:tickerId" element={<DetailsPage />} />
      <Route path="/404" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
