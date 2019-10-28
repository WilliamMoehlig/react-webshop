/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render as renderRtl } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../src/store/reducers';

export function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
  } = {}
) {
  return {
    ...renderRtl(ui, {
      wrapper: props => <Router {...props} history={history} />,
    }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

export function renderWithRedux(ui, { initialState = {}, store = createStore(rootReducer, initialState) } = {}) {
  return {
    ...renderRtl(ui, {
      wrapper: props => <Provider {...props} store={store} />,
    }),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}
