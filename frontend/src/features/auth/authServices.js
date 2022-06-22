const axios = require("axios").default;

const loginUser = async (dispatch, loginPayload) => {
  try {
    dispatch({ type: "REQUEST_LOGIN" });

    const response = await axios.post("/api/users/login", loginPayload);
    const data = await response.data;
    const status = await response.status;

    if (status === 200) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("user", data);

      return data;
    } else {
      dispatch({ type: "LOGIN_ERROR", error: data.message });

      return;
    }
  } catch (e) {
    dispatch({ type: "LOGIN_ERROR", error: e });
    console.log(e);
  }
};

const logoutUser = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("user");
};

const registerUser = async (dispatch, registerPayload) => {
  try {
    dispatch({ type: "REQUEST_REGISTER" });

    const response = await axios.post("/api/users/register", registerPayload);
    const data = await response.data;
    const status = await response.status;

    if (status === 200) {
      dispatch({ type: "REGISTRATION_SUCCESS", payload: data });
      localStorage.setItem("user", data);

      return data;
    } else {
      dispatch({ type: "REGISTRATION_ERROR", error: data.message });

      return;
    }
  } catch (e) {
    dispatch({ type: "REGISTRATION_ERROR", error: e });
    console.log(e);
  }
};

const authServices = { loginUser, logoutUser, registerUser };

export default authServices;
