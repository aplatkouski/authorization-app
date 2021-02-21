import { connect } from 'react-redux';

import LoginModal from './LoginModal';

const mapStateToProps = (state) => ({
  errorMessage: state.user.errorMessage,
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps)(LoginModal);
