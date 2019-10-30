import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Instructions from './Instructions';

describe('Instructions for seller', () => {
  const renderComponent = () => {
    return {
      ...render(<Instructions />),
    };
  };

  test('it renders', () => {
    const { getByText } = renderComponent();

    getByText(/instructions for seller/i);
    getByText(/if you have some information for the seller you can leave them in the box below/i);
  });

  test('it allows typing a message in the text area', () => {
    const { container } = renderComponent();
    const textArea = container.getElementsByTagName('textarea')[0];
    const text = 'random shizzle';

    fireEvent.change(textArea, { target: { value: text } });

    expect(textArea.value).toBe(text);
  });
});
