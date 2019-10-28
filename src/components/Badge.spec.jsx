import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render as renderRtl, within } from '@testing-library/react';

import Badge from './Badge';

describe('Badge component', () => {
  function renderComponent({ variant } = {}) {
    const dataTestId = 'given-test-id';

    const result = renderRtl(
      <Badge data-testid={dataTestId} variant={variant}>
        <div data-testid="child-id" />
      </Badge>
    );
    return {
      ...result,
      getComponent: result.getByTestId.bind(null, dataTestId),
    };
  }

  test('it renders the badge by default as primary badge', () => {
    const { getComponent } = renderComponent();

    const badge = getComponent();
    expect(badge).toHaveProperty('tagName', expect.stringMatching(/spa/i));
    expect(badge).toHaveClass('badge', 'badge-primary');

    const { getByTestId } = within(badge);
    getByTestId('child-id');
  });

  test('it adds classes according to variant', () => {
    const { getComponent } = renderComponent({ variant: 'light' });

    const badge = getComponent();
    expect(badge).toHaveClass('badge', 'badge-light');
  });
});
