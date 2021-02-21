import { auth } from 'Utils/firebase';
import { databaseActions } from 'States/database';
import * as t from './action-types';

export const signOut = () => {
  databaseActions.signOut();
  return {
    type: t.SIGN_OUT,
  };
};

export const loginSuccess = (uid) => ({
  type: t.LOGIN_SUCCESS,
  payload: uid,
});

export const loginFailure = (errorMessage) => ({
  type: t.LOGIN_FAILURE,
  payload: errorMessage,
});

export const fetchUsers = () => async (dispatch) => {
  dispatch(databaseActions.showLoader());
  try {
    await databaseActions.fetchUsers().then((users) =>
      dispatch({
        type: t.FETCH_USERS,
        payload: users,
      })
    );
  } catch (error) {
    if (error.message) {
      dispatch({
        type: t.UPDATE_FAILURE,
        payload: error.message,
      });
    }
  }
  dispatch(databaseActions.hideLoader());
};

export const changeUserStatus = (currentUserId, user, isActive) => async (dispatch) => {
  const { uid } = user;
  await databaseActions.updateUserProperty(uid, 'isActive', isActive);
  dispatch({
    type: t.UPDATE_DATA,
    payload: { ...user, isActive },
  });
  if (uid === currentUserId && !isActive) {
    dispatch(signOut());
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    const uid = await databaseActions.login({ email, password });
    await databaseActions.updateUserProperty(uid, 'lastLoginDate', Date.now());
    dispatch(loginSuccess(uid));
  } catch ({ message }) {
    if (message) {
      dispatch(loginFailure(message));
    }
  }
};

export const deleteUser = (currentUserId, uid) => async (dispatch) => {
  try {
    if (uid === currentUserId) {
      dispatch(signOut());
    }
  } catch ({ message }) {
    if (message) {
      dispatch({
        type: t.REGISTER_FAILURE,
        payload: message,
      });
    }
  }
};

export const signUp = (newUser) => async (dispatch) => {
  try {
    const { password, email, ...rest } = newUser;
    await auth.createUserWithEmailAndPassword(email, password);
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const uid = String(currentUser.uid);
        const user = { email, ...rest, uid };
        await databaseActions.putUserData(user);
        dispatch(loginSuccess(uid));
      } else {
        dispatch(loginFailure('I cannot get UID of new user!'));
      }
    });
  } catch ({ message }) {
    if (message) {
      dispatch({
        type: t.REGISTER_FAILURE,
        payload: message,
      });
    }
  }
};
