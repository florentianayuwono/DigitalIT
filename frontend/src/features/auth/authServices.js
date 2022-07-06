const axios = require("axios").default;

// !! Add http://localhost:5000 before /api for local testing.
const API_LINK =
  process.env.NODE_ENV === "production"
    ? "/api/users/"
    : // Heroku api database for testing
      "https://orbital-digital-it.herokuapp.com/api/users/";

export const loginUser = async (dispatch, loginPayload) => {
  /* 
    The types are probably messed up here. When this code was written, I assume that axios.---() is returning
    a javascript object that we can straightly use without parsing any json stuff.
    But if that is not the case, this code needs to be modified (add some parser here and there).
  */
  try {
    dispatch({ type: "REQUEST_LOGIN" });

    const response = await axios.post(API_LINK + "login", loginPayload);
    const data = await response.data;
    const status = await response.status;

    if (status === 200) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: data.message });
  } catch (e) {
    dispatch({ type: "LOGIN_ERROR", error: e.response.data.message });
    console.log(e.response.data.message);
  }
};

export const logoutUser = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("user");
};

export const registerUser = async (dispatch, registerPayload) => {
  try {
    dispatch({ type: "REQUEST_REGISTER" });

    const response = await axios.post(API_LINK + "register", registerPayload);
    const data = await response.data;
    const status = await response.status;

    if (status === 201) {
      dispatch({ type: "REGISTRATION_SUCCESS", payload: data });
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } else {
      dispatch({ type: "REGISTRATION_ERROR", error: data.message });

      return;
    }
  } catch (e) {
    dispatch({ type: "REGISTRATION_ERROR", error: e.response.data.message });
    console.log(e.response.data.message);
  }
};
