import axios from "axios";

const API_LINK =
  process.env.NODE_ENV === "production"
    ? "/api/platform/"
    : "http://localhost:5000/api/platform/";
// "https://orbital-digital-it.herokuapp.com/api/platform/";

export const getPlatform = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(API_LINK, config);
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
}