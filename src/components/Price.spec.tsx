import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Price from './Price';

describe('Money component', () => {
  type Options = {
    newPrice: number;
    oldPrice?: number;
  };

  function displayNumber(number) {
    return (Math.round(number * 100) / 100).toFixed(2).replace('.', ',');
  }

  function renderComponent(options: Options = { newPrice: 0 }) {
    return render(<Price newPrice={options.newPrice} oldPrice={options.oldPrice} />);
  }

  it('should only show the new price with the correct format', () => {
    const newPrice = 10.22;

    const { container } = renderComponent({ newPrice });

    const renderedPrice = container.querySelector('.money.money--new');
    expect(renderedPrice).toBeInTheDocument();
    expect(renderedPrice).toHaveTextContent(`€ ${displayNumber(newPrice)}`);

    expect(container.querySelector('.money.money--old')).not.toBeInTheDocument();
  });

  it('should show the old & new price with the correct format', () => {
    const newPrice = 20.589;
    const oldPrice = 31.567;

    const { container } = renderComponent({ newPrice, oldPrice });

    const renderedPrice = container.querySelector('.money.money--new');
    expect(renderedPrice).toBeInTheDocument();
    expect(renderedPrice).toHaveTextContent(`€ ${displayNumber(newPrice)}`);

    const renderedOldPrice = container.querySelector('.money.money--old');
    expect(renderedOldPrice).toBeInTheDocument();
    expect(renderedOldPrice).toHaveTextContent(`€ ${displayNumber(oldPrice)}`);

    const renderedDel = renderedOldPrice.querySelector('del');
    expect(renderedDel).toBeInTheDocument();
  });
});
