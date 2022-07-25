import axios from "axios";

const API_LINK =
  process.env.NODE_ENV === "production"
    ? "/api/business/"
    : "http://localhost:5000/api/business/";
// : "https://orbital-digital-it.herokuapp.com/api/business/";

export const getIndividualBusiness = async (id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_LINK}${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBusinesses = async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // dispatch({ type: "RESET"});
    dispatch({ type: "REQUEST_BUSINESSES" });

    const response = await axios.get(API_LINK, config);
    const data = await response.data;
    const status = await response.status;

    if (status === 200) {
      dispatch({ type: "GET_BUSINESSES_SUCCESS", payload: data });

      return data;
    } else {
      dispatch({ type: "GET_BUSINESSES_ERROR", error: data.message });

      return;
    }
  } catch (e) {
    dispatch({ type: "GET_BUSINESSES_ERROR", error: e.response.data.message });
    console.log(e.response.data.message);
  }
};

export const addBusiness = async (dispatch, businessPayload) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: "REQUEST_ADD_BUSINESS" });

    const response = await axios.post(API_LINK, businessPayload, config);
    const data = await response.data;
    const status = await response.status;

    if (status === 201) {
      dispatch({ type: "ADD_BUSINESS_SUCCESS", payload: data });

      return data;
    } else {
      dispatch({ type: "ADD_BUSINESS_ERROR", error: data.message });

      return;
    }
  } catch (e) {
    dispatch({ type: "ADD_BUSINESS_ERROR", error: e.response.data.message });
    console.log(e.response.data.message);
  }
};

export const updateBusiness = async (dispatch, businessPayload) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    dispatch({ type: "REQUEST_UPDATE_BUSINESS" });

    const response = await axios.put(
      API_LINK + businessPayload._id,
      businessPayload,
      config
    );
    const data = await response.data;
    const status = await response.status;

    if (status === 200) {
      dispatch({ type: "UPDATE_BUSINESS_SUCCESS", payload: data });

      return data;
    } else {
      dispatch({ type: "UPDATE_BUSINESS_ERROR", error: data.message });

      return;
    }
  } catch (e) {
    dispatch({ type: "UPDATE_BUSINESS_ERROR", error: e.response.data.message });
    console.log(e.response.data.message);
  }
};

export const deleteBusiness = async (dispatch, businessId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    dispatch({ type: "REQUEST_DELETE_BUSINESS", payload: businessId });

    const response = await axios.delete(API_LINK + businessId, config);
    const data = await response.data;
    const status = await response.status;

    if (status === 200) {
      dispatch({ type: "DELETE_BUSINESS_SUCCESS", payload: businessId });

      return data;
    } else {
      dispatch({ type: "DELETE_BUSINESS_ERROR", error: data.message });

      return;
    }
  } catch (e) {
    dispatch({ type: "DELETE_BUSINESS_ERROR", error: e.response.data.message });
    console.log(e.response.data.message);
  }
};

export const getBusinessSummary = async (dispatch, payload) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      business_id: payload.business_id,
      date_range: payload.date_range,
    },
  };

  try {
    dispatch({ type: "REQUEST_BUSINESS_SUMMARY" });

    const response = await axios.get(API_LINK + "summary/", config);
    const data = await response.data;
    const status = await response.status;

    if (status === 200) {
      dispatch({ type: "GET_BUSINESS_SUMMARY_SUCCESS", payload: data });

      return data;
    } else {
      dispatch({ type: "GET_BUSINESS_SUMMARY_ERROR", error: data.message });

      return;
    }
  } catch (e) {
    dispatch({
      type: "GET_BUSINESS_SUMMARY_ERROR",
      error: e.response.data.message,
    });
    console.log(e.response.data.message);
  }
};

/**
 *
 * @param {import("react").DispatchWithoutAction} dispatch
 * @param {Object} payload
 * @param {string} payload.business_id - id of the business
 * @param {string} payload.category - category of the business
 */
export const getBestBusinessPlatform = async (payload) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      business_id: payload.business_id,
      category: payload.business_category,
    },
  };

  try {
    const response = await axios.get(API_LINK + "bestplatform/", config);
    const data = await response.data;
    const status = await response.status;

    if (status === 200) {
      return data;
    } else {
      return;
    }
  } catch (e) {
    console.log(e.response.data.message);
  }
};
