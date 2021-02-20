import PropTypes from 'prop-types';
import * as React from 'react';
import { Row, Spinner } from 'react-bootstrap';

const MainView = ({ isAuth, isLoading }) => {
  return (
    <Row className="main-view">
      {isAuth && isLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </Row>
  );
};

MainView.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default MainView;
