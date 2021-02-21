import React from 'react';
import Container from 'react-bootstrap/Container';

import MainView from 'Components/MainView';
import 'Styles/app.scss';

const App = () => {
  return (
    <Container className="app-container" fluid>
      <MainView />
    </Container>
  );
};

export default App;
