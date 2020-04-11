export const userStatus = (user) => {
  return {
    type: "USER_STATUS",
    payload: user,
  };
};
