export const getAvailableUsers = (users) => {
  let userList = [];
  users.map((e) => {
    userList.push({ id: e.userId, userId: e.userLoginId });
  });
  return userList;
};
