import React from 'react';
import { formatCurrency } from '../util/numberUtils';

type MoneyProps = {
  newPrice: number;
  oldPrice?: number;
};

const Money: React.FC<MoneyProps> = (prices: MoneyProps) => {
  return (
    <>
      <span className="money money--new">{formatCurrency(prices.newPrice)}</span>
      {prices.oldPrice && prices.oldPrice > prices.newPrice && (
        <span className="money money--old">
          <del>{formatCurrency(prices.oldPrice)}</del>
        </span>
      )}
    </>
  );
};

export default Money;
