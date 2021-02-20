import React from 'react';
import Container from 'react-bootstrap/Container';

import LoginModal from 'Components/LoginModal';
import MainView from 'Components/MainView';

const App = () => {
  return (
    <Container className="app-container" fluid>
      <MainView />
      <LoginModal />
    </Container>
  );
};

export default App;
