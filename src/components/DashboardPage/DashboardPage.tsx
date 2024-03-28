import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Ticker } from '../../types';
import { StoreContext } from '../../storeContext';
import Sparkline from '../Sparkline';
import PriceCell from '../PriceCell';

const DashboardPage: React.FC = observer(() => {
  const store = useContext(StoreContext);

  return (
    <div className="pb-8">
      <h1 className="mb-8">Tickers List</h1>
      <table className="w-full max-w-screen-xl">
        <thead>
          <tr>
            <th>Ticker</th>
            <th className="text-sm md:text-base">Name</th>
            <th className="text-right">Price</th>
            <th className="hidden md:table-cell text-right">Change (d)</th>
            <th className="hidden md:table-cell text-right">Volume</th>
            <th className="text-right">Last 30 days</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(store.tickers).map(({
            id, name, price = 0, change = 0, volume = 0, history = [],
          }: Ticker) => (
            <tr key={id}>
              <td><Link to={`/${id}`}>{id}</Link></td>
              <td className="text-sm md:text-base">{name}</td>
              <PriceCell price={price} />
              <td className={`numeric hidden md:table-cell text-gray-400
                              ${change > 0 && 'text-green-800'} ${change < 0 && 'text-red-800'}`}>
                {change.toFixed(2)}%
              </td>
              <td className="numeric hidden md:table-cell">{Intl.NumberFormat().format(volume)}</td>
              <td>
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
