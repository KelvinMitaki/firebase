const INITIAL_STATE = {
  currentUser: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_STATUS":
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
