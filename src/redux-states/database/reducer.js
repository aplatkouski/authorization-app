import * as t from './action-types';

const initialState = {
  isLoading: true,
};

const handlers = {
  [t.HIDE_LOADER]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [t.SHOW_LOADER]: (state) => ({
    ...state,
    isLoading: true,
  }),
  DEFAULT: (state) => state,
};

const databaseReducer = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default databaseReducer;
