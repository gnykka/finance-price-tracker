import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { store } from '../../store';
import { Ticker } from "../../types";

const DashboardPage: React.FC = observer(() => {
  return (
    <div>
      <h1>List of Tickers</h1>
      {store.tickers.map((ticker: Ticker) => (
        <div key={ticker.id}>
          <Link to={`/${ticker.id}`}>{ticker.name}</Link>
        </div>
      ))}
    </div>
  );
});

export default DashboardPage;
