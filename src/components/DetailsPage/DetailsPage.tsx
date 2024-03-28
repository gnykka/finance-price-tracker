import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Ticker } from '../../types';
import { StoreContext } from '../../storeContext';
import PriceCell from '../PriceCell';
import MainChart from '../MainChart';

const DetailsPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const store = useContext(StoreContext);

  // TickerId is always the url search parameter
  const { tickerId = '' } = useParams<{ tickerId: string }>();
  const tickerData: Ticker | undefined = store.tickers[tickerId];

  // Redirect to 404 page if TicketId is not supported
  useEffect(() => {
    if (!tickerData) navigate('/404');
  }, [tickerData, navigate]);

  if (!tickerData) return null;

  const {
    id, name, price = 0, change = 0, volume = 0, history = [],
  } = tickerData;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center mb-2 text-sm">
        <Link to="/">Dashboard</Link>
        <span className="px-1">/</span>
        <span className="uppercase">{id}</span>
      </div>
      <h1 className="mb-4">{name}</h1>
      <div className="basis-full flex flex-col-reverse md:flex-row gap-4">
        <div className="h-full basis-full">
          <MainChart history={history} />
        </div>
        <table className="w-full h-fit max-w-[12em]">
          <tbody>
            <tr>
              <td>Price</td>
              <PriceCell price={price} />
            </tr>
            <tr>
              <td>Change</td>
              <td className={`numeric text-gray-400 ${change > 0 && 'text-green-800'}
                              ${change < 0 && 'text-red-800'}`}>
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
