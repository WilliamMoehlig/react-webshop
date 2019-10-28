/* eslint-disable import/prefer-default-export */
import { ADD_NOTIFICATION } from '../actionTypes';

export function addNotification(from, to, subject) {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      from,
      to,
      subject,
      date: new Date(),
    },
  };
}
