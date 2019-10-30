import React from 'react';
import { render, fireEvent } from '@testing-library/react';

describe('Instructions for seller', () => {
  const renderComponent = () => {
    return {
      ...render(<Instructions />),
    };
  };

  test('it renders', () => {
    const { container } = renderComponent();

    expect(container).toBeInTheDocument();
  });

  test('it allows typing a message in the text area', () => {
    const { container } = renderComponent();
    const textArea = container.getElementsByTagName('textarea')[0];
    const text = 'random shizzle';

    fireEvent.change(textArea, { target: { value: text } });

    expect(textArea.value).toBe(text);
  });
});
