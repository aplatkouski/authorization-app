import { connect } from 'react-redux';

import MainView from './MainView';

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
  isLoading: state.database.isLoading,
});

export default connect(mapStateToProps)(MainView);
