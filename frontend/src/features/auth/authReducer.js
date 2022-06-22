const user = JSON.parse(localStorage("user"));
const token = user.token;

export const initialAuthState = {
  user: user ? user : null,
  token: token ? token : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isSuccess: true,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.error,
      };
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

const registerReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_REGISTER":
      return {
        ...state,
        isLoading: true,
      };
    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isSuccess: true,
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.error,
      };
    default:
      throw new Error(`No matching action for ${action.type}`);
  }
};

const authReducer = { loginReducer, registerReducer };

export default authReducer;
