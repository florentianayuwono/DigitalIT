import axios from "axios";

const API_LINK =
  process.env.NODE_ENV === "production"
    ? "/api/product/"
    : "http://localhost:5000/api/product/";
      // "https://orbital-digital-it.herokuapp.com/api/product/";

// id is not a required field
export const getProducts = async (dispatch, getProductPayload) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const { id, business_id } = getProductPayload;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      business_id: business_id,
    },
  };

  // If there's an id, then we just need to get one product and use a special dispatch for that (read the reducer file)
  if (id) {
    try {
      dispatch({ type: "REQUEST_PRODUCT" });

      const response = await axios(API_LINK + id, config);
      const data = await response.data;
      const status = await response.status;

      if (status === 200) {
        dispatch({ type: "GET_PRODUCT_SUCCESS", payload: data });

        return data;
      } else {
        dispatch({ type: "GET_PRODUCT_ERROR", error: data.message });

        return;
      }
    } catch (e) {
      dispatch({ type: "GET_PRODUCT_ERROR", error: e.response.data.message });
      console.log(e.response.data.message);
    }
  } else {
    try {
      dispatch({ type: "RESET" });
      dispatch({ type: "REQUEST_PRODUCTS" });

      const response = await axios(API_LINK, config);
      const data = await response.data;
      const status = await response.status;

      if (status === 200) {
        dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: data });

        return data;
      } else {
        dispatch({ type: "GET_PRODUCTS_ERROR", error: data.message });

        return;
      }
    } catch (e) {
      dispatch({ type: "GET_PRODUCTS_ERROR", error: e.response.data.message });
      console.log(e.response.data.message);
    }
  }
};

export const addProduct = async (dispatch, addProductPayload) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: "REQUEST_ADD_PRODUCT" });

    const response = await axios.post(API_LINK, addProductPayload, config);
    const data = await response.data;
    const status = await response.status;

    if (status === 201) {
      dispatch({ type: "ADD_PRODUCT_SUCCESS", payload: data });

      return data;
    } else {
      dispatch({ type: "ADD_PRODUCT_ERROR", error: data.message });
      return;
    }
  } catch (e) {
    dispatch({ type: "ADD_PRODUCT_ERROR", error: e.response.data.message });
    console.log(e.response.data.message);
  }
};
