import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, within, waitForDomChange, act } from '@testing-library/react';

import UserCounterBadge from './UserCounterBadge';
import { listPagedUsers as listPagedUsersMock, listPagedUsers } from '../api/userApi';

jest.mock('../api/userApi');

describe('User Counter Badge component', () => {
  beforeEach(() => {
    listPagedUsersMock.mockResolvedValue({
      total: 10,
    });
  });

  test('it renders in its initial state', async () => {
    const { getByRole } = render(<UserCounterBadge />);

    const button = getByRole('button');
    expect(button).toHaveClass('btn', 'btn-primary');
    expect(button).toHaveTextContent('Users');

    const { getByTestId } = within(button);

    const badge = getByTestId('user-counter');
    expect(badge).toHaveProperty('tagName', expect.stringMatching(/span/i));
    expect(badge).toHaveClass('badge', 'badge-light');
    expect(badge).toHaveTextContent('???');

    await act(async () => {});
  });

  test('it retrieves the users and displays the total', async () => {
    const { getByTestId } = render(<UserCounterBadge />);

    const badge = getByTestId('user-counter');

    await waitForDomChange();

    expect(badge).toHaveTextContent(10);

    expect(listPagedUsers).toHaveBeenCalledWith(1, 0);
  });
});
