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

const updateUserLoginDate = (uid) => {
  databaseActions.updateUserProperty(uid, 'lastLoginDate', Date.now());
};

export const updateUserData = (user) => async (dispatch) => {
  const { password: _, ...userWithOutPassword } = user;
  try {
    await databaseActions.putUserData(userWithOutPassword);
    dispatch({
      type: t.UPDATE_DATA,
      payload: userWithOutPassword,
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

export const blockUser = (user) => async (dispatch) => {
  const { uid, ...rest } = user;
  databaseActions.updateUserProperty(uid, 'isActive', false);
  dispatch(updateUserData({ uid, ...rest, isActive: false }));
};

export const unblockUser = (user) => async (dispatch) => {
  const { uid, ...rest } = user;
  databaseActions.updateUserProperty(uid, 'isActive', true);
  dispatch(updateUserData({ uid, ...rest, isActive: true }));
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    if (auth.currentUser) {
      const uid = String(auth.currentUser.uid);
      dispatch(loginSuccess(uid));
      updateUserLoginDate(uid);
    } else {
      dispatch(loginFailure('I cannot get UID of current user!'));
    }
  } catch ({ message }) {
    if (message) {
      dispatch(loginFailure(message));
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
