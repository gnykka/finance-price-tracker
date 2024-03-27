import React, {
  useEffect, useContext, useState, useCallback,
} from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingCover from '../LoadingCover';
import DashboardPage from '../DashboardPage';
import DetailsPage from '../DetailsPage';
import NotFoundPage from '../NotFoundPage';
import {
  Ticker,
  TickerQuoteResponse,
  WebSocketMessageItem,
  WebSocketMessage,
} from '../../types';
import { StoreContext } from '../../storeContext';
import { getTickerQuotes } from '../../apiClient';
import TickerWebSocket from '../../websocket';

const App: React.FC = () => {
  const store = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  const handleTicketMessage = useCallback((message: WebSocketMessage) => {
    const { data, type } = message;

    if (type === 'trade') {
      data.forEach((item: WebSocketMessageItem) => {
        const { prevPrice = 0 }: Ticker = store.tickers[item.s];

        store.updateTicker(item.s, {
          price: item.p,
          change: ((item.p - prevPrice) / item.p) * 100,
        });
      });
    }
  }, [store]);

  useEffect(() => {
    const ids: string[] = Object.keys(store.tickers);

    getTickerQuotes(ids).then((data: TickerQuoteResponse[]) => {
      data.forEach((item: TickerQuoteResponse, index: number) => {
        store.updateTicker(ids[index], {
          price: item.close,
          prevPrice: item.previousClose,
          change: item.change_p,
          volume: item.volume,
        });
      });
      setLoading(false);
    });

    const tickerWebSocket = new TickerWebSocket(ids, handleTicketMessage);

    return () => tickerWebSocket.close();
  }, [store, handleTicketMessage]);

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
