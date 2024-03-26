import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Ticker } from '../../types';
import { StoreContext } from '../../storeContext';

const DetailsPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const store = useContext(StoreContext);
  const { tickerId } = useParams<{ tickerId: string }>();

  const [tickerData, setTickerData] = useState<Ticker | undefined>();

  useEffect(() => {
    const data = store.tickers.find((t) => t.id === tickerId);

    if (data) setTickerData(data);
    else navigate('/404');
  }, [store, navigate, tickerId]);

  if (!tickerData) return null;

  return (
    <div>
      <h1>{tickerData.name}</h1>
      <h3>{tickerData.price}</h3>
    </div>
  );
});

export default DetailsPage;
