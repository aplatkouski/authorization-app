import { auth } from 'Utils/firebase';
import { databaseActions } from 'States/database';
import * as t from './action-types';

export const loginSuccess = (uid) => ({
  type: t.LOGIN_SUCCESS,
  payload: uid,
});

export const loginFailure = (errorMessage) => ({
  type: t.LOGIN_FAILURE,
  payload: errorMessage,
});

export const fetchUsers = (userID) => async (dispatch) => {
  dispatch(databaseActions.showLoader());
  try {
    await databaseActions.fetchUsers(userID).then((users) =>
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

export const updateUserData = (user) => async (dispatch) => {
  try {
    await databaseActions.putUserData(user);
    dispatch({
      type: t.UPDATE_DATA,
      payload: user,
    });
  } catch (error) {
    if (error.message) {
      dispatch({
        type: t.UPDATE_FAILURE,
        payload: error.message,
      });
    }
  }
};

export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  await auth.signInWithEmailAndPassword(email, password);
  if (auth.currentUser) {
    dispatch(loginSuccess(String(auth.currentUser.uid)));
  } else {
    dispatch(loginFailure('I cannot get UID of current user!'));
  }
};

export const signUp = (newUser) => async (dispatch) => {
  try {
    const { email, password } = newUser;
    await auth.createUserWithEmailAndPassword(email, password);
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        const uid = String(auth.currentUser.uid);
        const user = { ...newUser, uid };
        databaseActions.putUserData(user);
        dispatch(loginSuccess(uid));
      } else {
        dispatch(loginFailure('I cannot get UID of new user!'));
      }
    });
  } catch (error) {
    if (error.message) {
      dispatch({
        type: t.REGISTER_FAILURE,
        payload: error.message,
      });
    }
  }
};
