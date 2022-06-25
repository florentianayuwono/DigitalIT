import axios from "axios";

const API_LINK =
  process.env.NODE_ENV === "production"
    ? "/api/business/"
    : "http://localhost:5000/api/business/";

export const getBusinesses = async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
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

const deleteBusiness = async (dispatch, businessId) => {
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
