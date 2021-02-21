import * as t from './action-types';

const initialState = {
  uid: '',
  allUsers: [],
  isAuth: false,
  errorMessage: '',
};

const handlers = {
  [t.FAILURE]: (state, { payload: errorMessage }) => ({
    ...state,
    errorMessage,
  }),
  [t.FETCH_USERS]: (state, { payload: allUsers }) => ({
    ...state,
    allUsers,
  }),
  [t.FETCH_USERS_FAILURE]: (state, { payload: errorMessage }) => ({
    ...state,
    errorMessage,
  }),
  [t.LOGIN_FAILURE]: (state, { payload: errorMessage }) => ({
    ...state,
    errorMessage,
  }),
  [t.LOGIN_SUCCESS]: (state, { payload: uid }) => ({
    ...state,
    uid,
    isAuth: true,
  }),
  [t.SIGN_OUT]: (state) => ({
    ...state,
    ...initialState,
  }),
  [t.REGISTER_FAILURE]: (state, { payload: errorMessage }) => ({
    ...state,
    errorMessage,
  }),
  [t.UPDATE_DATA]: (state, { payload: newUserData }) => {
    const allUsers = [...state.allUsers];
    allUsers.splice(
      state.allUsers.findIndex((user) => user.id === newUserData.id),
      1,
      newUserData
    );
    return {
      ...state,
      allUsers,
    };
  },
  [t.UPDATE_FAILURE]: (state, { payload: errorMessage }) => ({
    ...state,
    errorMessage,
  }),
  DEFAULT: (state) => state,
};

const userReducer = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default userReducer;
