import AuthenticationForm from 'Components/AuthenticationForm';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Alert, Modal } from 'react-bootstrap';

const LoginModal = ({ errorMessage, isAuth }) => {
  const [isRegistration, setRegistration] = React.useState(false);

  const handleRegistered = (event) => {
    event.preventDefault();
    setRegistration((prevState) => !prevState);
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="login-modal"
      onHide={() => null}
      show={!isAuth}
    >
      <Modal.Header>
        <Modal.Title className="text-center" id="contained-modal-title-vcenter">
          Authorization App
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && (
          <Alert className="text-warning text-center">{errorMessage}</Alert>
        )}
      </Modal.Body>
      <Modal.Footer className="pt-0 pb-0">
        {isRegistration ? (
          <div className="block-signup">
            <span
              aria-labelledby="move-to-register-form"
              className="text-uppercase btn-signup"
              onClick={handleRegistered}
              onKeyDown={handleRegistered}
              role="button"
              tabIndex={0}
            >
              Back to login
            </span>
          </div>
        ) : (
          <div className="block-signup block-login">
            <h6 className="pt-2">Don’t have an account?</h6>
            <span
              aria-labelledby="move-to-register-form"
              className="text-uppercase btn-signup btn-login"
              onClick={handleRegistered}
              onKeyDown={handleRegistered}
              role="button"
              tabIndex={0}
            >
              Sign up
            </span>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

LoginModal.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default LoginModal;
