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

  // Callback to parse Websocket messages and update the store
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

  // Main useEffect to request and update the tickers data
  useEffect(() => {
    const ids: string[] = Object.keys(store.tickers);

    // Get the quotes for the table and details, after — hide loading cover
    getTickerQuotes(ids)
      .then((data: TickerQuoteResponse[]) => {
        data.forEach((item: TickerQuoteResponse, index: number) => {
          store.updateTicker(ids[index], {
            price: item.close,
            prevPrice: item.previousClose,
            change: item.change_p,
            volume: item.volume,
          });
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });

    // Create Websocket connection and subscribe to our tickers
    const tickerWebSocket = new TickerWebSocket(ids, handleTicketMessage);

    // Close connection on unmount
    return () => tickerWebSocket.close();
  }, [store, handleTicketMessage]);

  return (
    <div className="flex flex-col w-full h-full px-3 py-4 md:px-6">
      <LoadingCover loading={loading}/>
      <div className="basis-full">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/:tickerId" element={<DetailsPage />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </div>
      <div className="flex gap-3 pt-2">
        © 2024
        <a href="https://github.com/gnykka/finance-price-tracker">Github</a>
      </div>
    </div>
  );
};

export default App;
