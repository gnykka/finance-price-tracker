import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Ticker } from '../../types';
import { StoreContext } from '../../storeContext';

const DetailsPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const store = useContext(StoreContext);

  const { tickerId = '' } = useParams<{ tickerId: string }>();
  const tickerData: Ticker | undefined = store.tickers[tickerId];

  useEffect(() => {
    if (!tickerData) navigate('/404');
  }, [tickerData, navigate]);

  if (!tickerData) return null;

  const {
    id, name, price = 0, change = 0, volume = 0,
  } = tickerData;

  return (
    <div>
      <div className="flex items-center mb-2 text-sm">
        <Link to="/">Dashboard</Link>
        <span className="px-1">/</span>
        <span className="uppercase">{id}</span>
      </div>
      <h1 className="mb-4">{name}</h1>
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="basis-full"/>
        <table className="w-full max-w-[12em]">
          <tbody>
            <tr>
              <td>Price</td>
              <td className="numeric">${price.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Change</td>
              <td className={`numeric text-gray-400 ${change > 0 && 'text-green'}
                              ${change < 0 && 'text-red'}`}>
                {change.toFixed(2)}%
              </td>
            </tr>
            <tr>
              <td>Volume</td>
              <td className="numeric">{Intl.NumberFormat().format(volume)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default DetailsPage;
