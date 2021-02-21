import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const AuthenticationForm = ({ isAuth, isRegistration, login, signUp }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isRegistration) {
      signUp({
        ...userData,
        registrationDate: Date.now(),
        lastLoginDate: Date.now(),
        isActive: true,
      });
    } else {
      login(userData);
    }
    setValidated(true);
  };

  const { name, password, email } = userData;
  return (
    <Form className="authentication-form" onSubmit={handleSubmit} validated={validated}>
      {isRegistration && (
        <Form.Group controlId="validationUsername">
          <Form.Control
            autoComplete="off"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            required
            type="text"
            value={name}
          />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      )}
      <Form.Group controlId="validationUserEmail">
        <InputGroup hasValidation>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            autoComplete="off"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
            type="email"
            value={email}
          />
          <Form.Control.Feedback type="invalid">
            Please type a correct email.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control
          aria-describedby="passwordHelpBlock"
          autoComplete="off"
          minLength={Number(1)}
          name="password"
          onChange={handleChange}
          pattern=".+"
          placeholder="Password"
          required
          type="password"
          value={password}
        />
        <Form.Control.Feedback type="invalid">
          Password is required.
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        className="text-uppercase"
        disabled={isAuth}
        type="submit"
        variant="primary"
      >
        {isRegistration ? 'Sign up' : 'Login'}
      </Button>
    </Form>
  );
};

AuthenticationForm.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  isRegistration: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default AuthenticationForm;
