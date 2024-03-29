import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Ticker, TickerHistoryItem } from '../../types';
import { StoreContext } from '../../storeContext';
import { getTickerHistoryData } from '../../apiClient';
import Sparkline from '../Sparkline';
import TickerPrice from '../TickerPrice';

const DashboardPage: React.FC = observer(() => {
  const store = useContext(StoreContext);

  // Request and update the tickers history data
  useEffect(() => {
    const ids: string[] = Object
      .keys(store.tickers)
      .filter((key) => !store.tickers[key].history);

    // For each ticker that does not have the history
    // get the historical market data (available for the last year)
    ids.forEach((id) => {
      getTickerHistoryData(id)
        .then((data: TickerHistoryItem[]) => {
          store.updateTicker(id, { history: data });
        })
        .catch(() => {
          // No history was received and rendered
        });
    });
  }, [store]);

  return (
    <div className="pb-8">
      <h1 className="mb-8">Tickers List</h1>
      <table className="w-full md:w-fit">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="hidden md:table-cell text-right">Change</th>
            <th className="hidden md:table-cell text-right">Volume</th>
            <th className="text-right">Last 30 days</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(store.tickers).map(({
            id, name, price = 0, change = 0, volume = 0, history = [],
          }: Ticker) => (
            <tr key={id}>
              <td className="w-[5rem]"><Link to={`/${id}`}>{id}</Link></td>
              <td className="w-1/3 text-xs md:text-base">{name}</td>
              <td className="numeric">
                <TickerPrice price={price} />
              </td>
              <td className={`numeric hidden md:table-cell text-gray-400
                              ${change > 0 && 'text-green-800'} ${change < 0 && 'text-red-800'}`}>
                {change.toFixed(2)}%
              </td>
              <td className="w-1/6 numeric hidden md:table-cell">{Intl.NumberFormat().format(volume)}</td>
              <td className="max-w-[120px] h-[50px]">
                <Sparkline
                  history={history.slice(-30)}
                  width={100}
                  height={32}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default DashboardPage;
