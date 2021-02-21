import { database } from 'Utils/firebase';
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
  return Promise.resolve(user);
};

export const fetchUsers = async () => {
  const userListRef = database.ref(`users/`);
  const users = [];
  await userListRef.once('value', (usersSnapshot) => {
    usersSnapshot.forEach((userSnapshot) => {
      users.push({ ...userSnapshot.val(), uid: userSnapshot.key });
    });
  });
  return Promise.resolve(users);
};
