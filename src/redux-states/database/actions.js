import { auth, database } from 'Utils/firebase';
import * as t from './action-types';

export const showLoader = () => ({
  type: t.SHOW_LOADER,
});

export const hideLoader = () => ({
  type: t.HIDE_LOADER,
});

export const putUserData = async (user) => {
  const { uid, ...rest } = user;
  const userRef = database.ref(`users/${uid}`);
  await userRef.set({ ...rest });
  return user;
};

export const updateUserProperty = (userId, propertyName, value) =>
  database.ref(`users/${userId}/${propertyName}`).set(value);

const parseUsersSnapshot = (usersSnapshot) => {
  const toLocaleDateString = (timestamp) => {
    const locales = 'ru-Ru';
    const dateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const date = new Date(timestamp);
    return date.toLocaleDateString(locales, dateTimeFormatOptions);
  };
  const users = [];
  usersSnapshot.forEach((userSnapshot) => {
    users.push({
      ...userSnapshot.val(),
      id: userSnapshot.key.substring(0, 7),
      uid: userSnapshot.key,
      registrationDate: toLocaleDateString(userSnapshot.child('registrationDate').val()),
      lastLoginDate: toLocaleDateString(userSnapshot.child('lastLoginDate').val()),
    });
  });
  return users;
};

export const fetchUsers = async () => {
  const userListRef = database.ref(`users/`);
  const usersSnapshot = await userListRef.once('value');
  return parseUsersSnapshot(usersSnapshot);
};

export const login = async ({ email, password }) => {
  await auth.signInWithEmailAndPassword(email, password);
  return String(auth.currentUser.uid);
};

export const signOut = async () => auth.signOut();
