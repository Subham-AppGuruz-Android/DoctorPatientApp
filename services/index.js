import axios from "axios";
// import store from 'store';
import { getToken } from "./session";

// const checkStatus = (status) => status >= 200 && status < 300;

const client = axios.create({
  baseURL: "https://uat.wishhealth.in/",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  // validateStatus: checkStatus,
});

// Add token for every request if provided
// client.interceptors.request.use((config) => {
//   let token = null;
//   token = getToken();
//   if (token) {
//     config.headers.authorization = `bearer ${token}`;
//   }
//   return Promise.resolve(config);
// });

export { client };
