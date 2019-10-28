import { ADD_NOTIFICATION } from '../actionTypes';

function notificationReducer(previousState = {}, action) {
  switch (action && action.type) {
    case ADD_NOTIFICATION: {
      const { payload: notification } = action;

      const userNotifications = previousState[notification.to] || [];

      return { ...previousState, [notification.to]: [...userNotifications, { ...notification }] };
    }
    default:
      return previousState;
  }
}

export default notificationReducer;
