import PropTypes from 'prop-types';
import * as React from 'react';
import { Row, Spinner } from 'react-bootstrap';

const MainView = ({ isLoading }) => {
  return (
    <Row className="main-view">
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </Row>
  );
};

MainView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default MainView;
