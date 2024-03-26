import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Ticker } from '../../types';
import { StoreContext } from '../../storeContext';

const DashboardPage: React.FC = observer(() => {
  const store = useContext(StoreContext);

  return (
    <div className="h-full px-6 py-4">
      <h1 className="mb-8">Tickers List</h1>
      <table className="max-w-[800px]">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>Volume</th>
            <th>Sparkline</th>
          </tr>
        </thead>
        <tbody>
          {store.tickers.map((ticker: Ticker) => (
            <tr key={ticker.id}>
              <td><Link to={`/${ticker.id}`}>{ticker.id}</Link></td>
              <td>{ticker.name}</td>
              <td className="numeric">${(ticker.price || 0).toFixed(2)}</td>
              <td className="numeric">{(ticker.change || 0).toFixed(2)}%</td>
              <td className="numeric">{ticker.volume || 0}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default DashboardPage;
