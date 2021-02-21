import { combineReducers } from 'redux';

import { databaseReducer } from 'States/database';
import { userReducer } from 'States/user';

const rootReducer = combineReducers({
  database: databaseReducer,
  user: userReducer,
});

export default rootReducer;
