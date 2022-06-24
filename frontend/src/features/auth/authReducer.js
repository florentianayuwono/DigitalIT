const temp = JSON.parse(localStorage.getItem("user"));
const user = temp ? temp.user : null;
const token = user ? user.token : null;

export const initialAuthState = {
  user: user ? user : null,
  username: "",
  token: token ? token : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const authReducer = (state, action) => {
  let newState = state;
  switch (action.type) {
    case "REQUEST_REGISTER":
    case "REQUEST_LOGIN":
      return {
        ...state,
        isLoading: true,
        message: "loading ..."
      };
    case "REGISTRATION_SUCCESS":
    case "LOGIN_SUCCESS":
      newState = {
        ...state,
        user: action.payload.user_id,
        username: action.payload.fullName,
        token: action.payload.token,
        isLoading: false,
        isSuccess: true,
        message: ""
      };

      return newState;
    case "REGISTRATION_ERROR":
    case "LOGIN_ERROR":
      newState = {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.error,
      };

      return newState;
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      throw new Error(`No matching action for ${action.type}`);
  }
};