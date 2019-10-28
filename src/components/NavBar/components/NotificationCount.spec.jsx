import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import { renderWithRedux } from '../../../../test/render-utils';
import NotificationCount from './NotificationCount';

describe('Notification Count component', () => {
  function render(initialNotificationsState = {}) {
    return renderWithRedux(<NotificationCount currentIdentity="user1" />, {
      initialState: {
        notifications: initialNotificationsState,
      },
    });
  }

  test('it renders the component by default', () => {
    const { getByText, getByTestId } = render();

    const notificationIcon = getByTestId('notification-icon');
    expect(notificationIcon).toHaveClass('fa', 'fa-envelope');

    getByText(/(0)/);
  });

  test('it renders the correct amount of notifications for the current user', () => {
    const initialState = {
      user2: [{}],
      user1: [{}, {}],
    };

    const { getByText } = render(initialState);
    getByText(/(2)/);
  });
});
