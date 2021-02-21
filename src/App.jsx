import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import LoginModal from 'Components/LoginModal';
import MainView from 'Components/MainView';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'States/user';
import { auth } from 'Utils/firebase';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  useEffect(() => {
    if (auth.currentUser) dispatch(userActions.fetchUsers());
  }, [isAuth, dispatch]);

  return (
    <Container className="app-container" fluid>
      <MainView />
      <LoginModal />
    </Container>
  );
};

export default App;
