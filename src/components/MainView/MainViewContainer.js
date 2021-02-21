import { connect } from 'react-redux';

import MainView from './MainView';

const mapStateToProps = (state) => ({
  isLoading: state.database.isLoading,
});

export default connect(mapStateToProps)(MainView);
