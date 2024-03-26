import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { store } from '../../store';
import { Ticker } from '../../types';

const DetailsPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const { ticker } = useParams<{ ticker: string }>();

  const details: (Ticker | undefined) = store.tickers.find((t) => t.id === ticker);

  useEffect(() => {
    if (!details) navigate('/404');
  }, [details, navigate]);

  if (!details) return null;

  return (
    <h1>{details.name}</h1>
  );
});

export default DetailsPage;
