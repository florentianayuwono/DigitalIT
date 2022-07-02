import axios from "axios";

const API_LINK =
  process.env.NODE_ENV === "production"
    ? "/api/product/"
    : "https://orbital-digital-it.herokuapp.com/api/product/";

// id is not a required field
export const getProducts = async (dispatch, id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  // If there's an id, then we just need to get one product and use a special dispatch for that (read the reducer file)
  if (id) {
    try {
      dispatch({ type: "REQUEST_PRODUCT" });

      const response = await axios.get(API_LINK + id, config);
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

      const response = await axios.get(API_LINK, config);
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
