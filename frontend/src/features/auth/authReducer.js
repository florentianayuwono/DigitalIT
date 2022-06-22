const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return;
    case "LOGIN_SUCCESS":
      return;
    case "LOGIN_ERROR":
      return;
    case "LOGOUT":
      return;
    default:
      throw new Error("No matching action for ${action.type}");
  }
};

const registerReducer = (state, action) => {
  switch (action.type) {
    case: "REGISTER_REQUEST":
      return;
    case "REGISTER_SUCCESS":
      return;
    case "REGISTER_ERROR":
      return;
    default:
      throw new Error("No matching action for ${action.type}");
  }
}

const authReducer = { loginReducer, registerReducer };

export default authReducer;
