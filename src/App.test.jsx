import { render } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders App', () => {
  const { getAllByText } = render(<App />);

  expect(getAllByText(/Hello world/i)).toHaveLength(1);
});
