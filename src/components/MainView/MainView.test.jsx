import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';

import store from 'States/root-store';
import MainView from './MainView';

test('renders MainView', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MainView isAuth isLoading />
    </Provider>
  );

  expect(getByText(/Loading.../i)).toBeInTheDocument();
});
