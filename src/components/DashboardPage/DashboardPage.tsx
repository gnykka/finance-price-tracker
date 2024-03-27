import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Ticker } from '../../types';
import { StoreContext } from '../../storeContext';

const DashboardPage: React.FC = observer(() => {
  const store = useContext(StoreContext);

  return (
    <div className="h-full">
      <h1 className="mb-8">Tickers List</h1>
      <table className="w-full max-w-screen-xl">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-right">Change</th>
            <th className="hidden md:block text-right">Volume</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(store.tickers).map(({
            id, name, price = 0, change = 0, volume = 0,
          }: Ticker) => (
            <tr key={id}>
              <td><Link to={`/${id}`}>{id}</Link></td>
              <td>{name}</td>
              <td className="numeric">${price.toFixed(2)}</td>
              <td className={`numeric text-gray-400 ${change > 0 && 'text-green'}
                              ${change < 0 && 'text-red'}`}>
                {change.toFixed(2)}%
              </td>
              <td className="numeric hidden md:block">{Intl.NumberFormat().format(volume)}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default DashboardPage;
