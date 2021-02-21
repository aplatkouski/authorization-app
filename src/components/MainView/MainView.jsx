import UserTable from 'Components/UserTable';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const MainView = ({ isAuth, isLoading }) => {
  const users = useSelector((state) => state.user.allUsers);
  const renderElement = () => {
    if (isAuth) {
      return isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <UserTable users={users} />
      );
    }
    return null;
  };

  return <Row className="main-view">{renderElement()}</Row>;
};

MainView.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default MainView;
