import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, within, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';

import Alert from './Alert';

describe('Alert component', () => {
  test('it renders by default', () => {
    const childTestId = 'childTestId';

    const { getByRole, queryByText } = render(
      <Alert>
        <div data-testid={childTestId} />
      </Alert>
    );

    const alert = getByRole('alert');
    expect(alert).toHaveClass('alert', 'alert-primary');
    expect(alert).not.toHaveClass('alert-dismissible');

    const { getByTestId } = within(alert);
    getByTestId(childTestId);

    expect(queryByText(/×/)).not.toBeInTheDocument();
  });

  test('it renders with a class according to specified variant', () => {
    const { getByRole } = render(<Alert variant="secondary">Special Warning</Alert>);

    const alert = getByRole('alert');
    expect(alert).toHaveClass('alert', 'alert-secondary');
  });

  test('it allows to dismiss itself', async () => {
    const { getByRole, getByText, queryByRole } = render(<Alert dismissible>I can be dismissed</Alert>);

    const alert = getByRole('alert');
    expect(alert).toHaveClass('alert-dismissible');

    const dismissButton = getByText(/×/).parentElement;
    expect(dismissButton).toHaveClass('close');
    expect(dismissButton).toHaveAttribute('aria-label', 'Close');

    fireEvent.click(dismissButton);

    await waitForElementToBeRemoved(() => queryByRole('alert'));
  });
});
