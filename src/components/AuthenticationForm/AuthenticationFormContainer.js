import { connect } from 'react-redux';

import { userActions } from 'States/user';
import AuthenticationForm from './AuthenticationForm';

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.user.isAuth,
  isRegistration: ownProps.isRegistration,
});

const mapDispatchToProps = {
  login: userActions.login,
  signUp: userActions.signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationForm);
