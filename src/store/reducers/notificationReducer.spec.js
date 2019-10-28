import mockDate from 'mockdate';

import reducer from './notificationReducer';
import { addNotification } from '../actions/notificationActions';

describe('Notification reducer', () => {
  afterEach(() => mockDate.reset());

  test('it is by default an empty object', () => {
    const state = reducer();

    expect(state).toStrictEqual({});
  });

  test('it reduces ADD_NOTIFICATION', () => {
    const from = 'john';
    const to = 'jane';
    const subject = 'Meeting tomorrow';

    const initialState = {
      system: [],
    };

    const givenDate = new Date(2019, 9, 23, 14, 44, 10, 598);
    mockDate.set(givenDate);

    const state = reducer(initialState, addNotification(from, to, subject));

    expect(state).toStrictEqual({
      system: [],
      [to]: [
        {
          from,
          to,
          subject,
          date: givenDate,
        },
      ],
    });

    const laterDate = new Date(2019, 9, 23, 14, 47, 16, 198);
    mockDate.set(laterDate);

    const stateAfterSecondNotification = reducer(state, addNotification('another', to, 'Meeting cancelled'));

    expect(stateAfterSecondNotification).toHaveProperty('jane');

    // We don't want to mutate are array
    expect(stateAfterSecondNotification.jane).not.toBe(state.jane);

    expect(stateAfterSecondNotification).toStrictEqual({
      system: [],
      [to]: [
        {
          from,
          to,
          subject,
          date: givenDate,
        },
        {
          from: 'another',
          to,
          subject: 'Meeting cancelled',
          date: laterDate,
        },
      ],
    });
  });
});
