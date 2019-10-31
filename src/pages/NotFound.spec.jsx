import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import NotFound from './NotFound';

describe('NotFound component', () => {
  it('should render by default', () => {
    const { getByText } = render(<NotFound />);

    const title = getByText('Oops! These are not the droids you are looking for.');
    expect(title).toHaveProperty('tagName', expect.stringMatching(/h1/i));
  });
});
