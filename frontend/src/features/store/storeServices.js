import axios from "axios";

const API_LINK =
  process.env.NODE_ENV === "production"
    ? "/api/store/"
    : "http://localhost:5000/api/store/";
// "https://orbital-digital-it.herokuapp.com/api/store/";

export const getStore = async ({ store_id, business_id }) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const config = business_id
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
          business_id: business_id,
        },
      }
    : {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

  try {
    const response = await axios(
      store_id ? API_LINK + store_id : API_LINK,
      config
    );
    const data = await response.data;
    const status = await response.status;

    if (status === 200) {
      return data;
    } else {
      return;
    }
  } catch (e) {
    console.log(e);
  }
};

export const addStore = async ({ business_id, platform_id }) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      API_LINK,
      { business_id, platform_id },
      config
    );
    const data = await response.data;
    const status = await response.status;

    if (status === 200) {
      return data;
    } else {
      return;
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteStore = async ({ store_id }) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(API_LINK + store_id, config);
    const data = await response.data;
    const status = await response.status;

    if (status === 200) {
      return data;
    } else {
      return;
    }
  } catch (e) {
    console.log(e);
  }
};
