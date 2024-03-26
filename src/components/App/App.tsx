import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../DashboardPage';
import DetailsPage from '../DetailsPage';
import NotFoundPage from '../NotFoundPage';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/:ticker" element={<DetailsPage />} />
    <Route path="/404" element={<NotFoundPage />} />
  </Routes>
);

export default App;
