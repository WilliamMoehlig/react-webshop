import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import AlertHeader from './AlertHeader';

describe('Alert header', () => {
  test('it renders by default', () => {
    const { getByRole } = render(<AlertHeader>Makes the warning go away</AlertHeader>);

    const header = getByRole('heading');
    expect(header).toHaveProperty('nodeName', expect.stringMatching(/h4/i));
    expect(header).toHaveClass('alert-heading');
  });

  test('it renders its children', () => {
    const childTestId = 'child-id';
    const { getByTestId } = render(
      <AlertHeader>
        <div data-testid={childTestId} />
      </AlertHeader>
    );

    getByTestId(childTestId);
  });

  test('it allows classes to be added trough className', () => {
    const expectedClass = 'another-class';

    const { container } = render(<AlertHeader className={expectedClass}>Makes the warning go away</AlertHeader>);

    const header = container.firstChild;
    expect(header).toHaveClass('alert-heading', expectedClass);
  });
});
