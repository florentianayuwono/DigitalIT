import axios from "axios";

const API_LINK =
  process.env.NODE_ENV === "production"
    ? "/api/product/"
    : "http://localhost:5000/api/product/";
// "https://orbital-digital-it.herokuapp.com/api/product/";

// id is not a required field
export const getProducts = async (dispatch, getProductPayload) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const { id, business_id, store_id } = getProductPayload;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      business_id,
      store_id,
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

export const addProduct1 = async (dispatch, addProductPayload) => {
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

// Replacement for the function above.
export const addProduct = async (dispatch, addProductPayload) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: "REQUEST_ADD_PRODUCT" });

    const response = await axios.post(
      API_LINK + "main/",
      addProductPayload,
      config
    );
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

export const deleteProduct = async (dispatch, deleteProductPayload) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: "REQUEST_DELETE_PRODUCT" });

    const response = await axios.delete(
      API_LINK + deleteProductPayload.product_local_id,
      config
    );
    console.log(deleteProductPayload);
    const data = await response.data;
    const status = await response.status;

    if (status === 200) {
      dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: data });

      return data;
    } else {
      dispatch({ type: "DELETE_PRODUCT_ERROR", error: data.message });
      return;
    }
  } catch (e) {
    dispatch({ type: "DELETE_PRODUCT_ERROR", error: e.response.data.message });
    console.log(e.response.data.message);
  }
};

// Search for a product by keyword
export const searchProduct = async (keyword) => {
  try {
    const response = await axios.get(API_LINK + "main/all&" + keyword);
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

export const addLocalProduct = async ({
  product_id,
  store_id,
  product_cost,
  product_price,
}) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      API_LINK,
      {
        store_id,
        product_id,
        product_cost,
        product_price,
      },
      config
    );
    const data = await response.data;
    const status = await response.status;

    if (status === 201) {
      return data;
    } else {
      return;
    }
  } catch (e) {
    console.log(e.response.data.message);
  }
};

export const getAllLocalProducts = async ({ store_id }) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      store_id,
    },
  };

  try {
    const response = await axios.get(API_LINK, config);
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

/**
 * @param {React.DispatchWithoutAction} dispatch The dispatcher for the reducer.
 * @param {Object} productSalesPayload The payload to be sent to the server.
 * @returns {Object} The list of responses from the server.
 */
export const productSalesInputHandler = async (
  dispatch,
  productSalesPayload
) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({
      type: "REQUEST_INPUT_PRODUCT_SALES",
      payload: productSalesPayload,
    });

    const responseData = {};

    // Since the payload is a list of objects, we need to loop through it and send each object individually.
    // Filter objects that isChecked is false
    Object.keys(productSalesPayload)
      .filter(
        (key) => productSalesPayload[key].isChecked === true && key !== "period"
      )
      .forEach(async (key) => {
        const inputData = {
          product_local_id: key,
          date_range: productSalesPayload.period,
          number_of_sales: productSalesPayload[key].product_sales,
        };

        const response = await axios.post(
          API_LINK + "sales/",
          inputData,
          config
        );
        const data = response.data;
        const status = response.status;

        if (status !== 201) {
          dispatch({ type: "INPUT_PRODUCT_SALES_ERROR", error: data.message });
          throw new Error(data.message);
        } else {
          responseData[key] = data;
        }
      });

    return responseData;
  } catch (e) {
    dispatch({
      type: "INPUT_PRODUCT_SALES_ERROR",
      error: e.response.data.message,
    });
    console.log(e.response.data.message);
  }
};
