import React, { useEffect, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingCover from '../LoadingCover';
import DashboardPage from '../DashboardPage';
import DetailsPage from '../DetailsPage';
import NotFoundPage from '../NotFoundPage';
import { TickerQuoteResponse } from '../../types';
import { StoreContext } from '../../storeContext';
import { getTickerQuotes } from '../../apiClient';

const App: React.FC = () => {
  const store = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids: string[] = Object.keys(store.tickers);

    getTickerQuotes(ids).then((data: TickerQuoteResponse[]) => {
      data.forEach((item, index) => {
        store.updateTicker(ids[index], {
          price: item.close,
          change: item.change_p,
          volume: item.volume,
        });
      });
      setLoading(false);
    });
  }, [store]);

  return (
    <main className="w-full h-full px-6 py-4">
      <LoadingCover loading={loading}/>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/:tickerId" element={<DetailsPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
};

export default App;
