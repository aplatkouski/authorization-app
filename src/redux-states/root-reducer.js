import { combineReducers } from 'redux';

import { databaseReducer } from 'States/database';

const rootReducer = combineReducers({
  database: databaseReducer,
});

export default rootReducer;
