import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';

import store from 'States/root-store';
import LoginModal from './LoginModal';

test('renders LoginModal', () => {
  const { getByText } = render(
    <Provider store={store}>
      <LoginModal errorMessage="" isAuth={false} />
    </Provider>
  );

  expect(getByText(/Don’t have an account\?/i)).toBeInTheDocument();
});

test('renders LoginModal with Alert', () => {
  const errorMessage = 'Something goes wrong!';
  const { getByText } = render(
    <Provider store={store}>
      <LoginModal errorMessage={errorMessage} isAuth={false} />
    </Provider>
  );

  expect(getByText(errorMessage)).toBeInTheDocument();
});
