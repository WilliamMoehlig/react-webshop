import React from 'react';
import { useSelector } from 'react-redux';
import { string } from 'prop-types';

function NotificationCount({ currentIdentity }) {
  const totalNotificationsForUser = useSelector(state => {
    const notificationsForUser = state.notifications[currentIdentity] || [];
    return notificationsForUser.length;
  });

  return (
    <span className="mr-3">
      <i data-testid="notification-icon" className="fa fa-envelope" /> ({totalNotificationsForUser})
    </span>
  );
}

NotificationCount.propTypes = {
  currentIdentity: string.isRequired,
};

export default NotificationCount;
