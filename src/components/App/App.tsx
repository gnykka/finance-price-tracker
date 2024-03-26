import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../DashboardPage';
import DetailsPage from '../DetailsPage';
import NotFoundPage from '../NotFoundPage';
import { StoreContext } from '../../storeContext';

const App: React.FC = () => {
  const store = useContext(StoreContext);

  useEffect(() => {
    setInterval(() => {
      const data = [
        { id: 'AAPL', price: Math.random() * 100 },
        { id: 'GOOGL', price: Math.random() * 100 },
      ];

      data.forEach((v) => {
        store.updatePrice(v.id, v.price);
      });
    }, 3000);
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
