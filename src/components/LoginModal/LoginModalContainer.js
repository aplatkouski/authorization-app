import { connect } from 'react-redux';

import LoginModal from './LoginModal';

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps)(LoginModal);
