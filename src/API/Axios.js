import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:9000",
});

export { Axios };

// =======================================================
// =======================================================
// axios interceptors is used to add or do anything before
// sending or after receving requests to all requests

// // =========================
// // Add a request interceptor
// Axios.interceptors.request.use(
//   // before request is sent
//   (config) => {
//     console.log("request config", config);
//     return config;
//   },

//   // if their is error
//   (error) => {
//     console.log("request error", error);
//     return Promise.reject(error);
//   }
// );

// // =========================
// // Add a response interceptor
// Axios.interceptors.response.use(
//   // if response success
//   (response) => {
//     console.log("response res", response);
//     return response;
//   },

//   // if their is error
//   (error) => {
//     console.log("response error", error);
//     return Promise.reject(error);
//   }
// );

// =======================================================
// =======================================================

// Axios.interceptors.request.use(
//   (config) => {
//     if (config.url.includes("posts")) {
//       // config.url = "`${config.url}&fireEvent=true`";
//       console.log(config.url); // /posts
//     }

//     console.log("request done");
//     return config;
//   },

//   (error) => {
//     console.log("request error", error);
//     return Promise.reject(error);
//   }
// );

// Axios.interceptors.response.use(
//   (response) => {
//     // 1 => response will fail (posts server blocked) => url = posts
//     console.log("response done", response);
//     return response;
//   },

//   async (error) => {
//     // 2 => handle error => url don't includes errors
//     // 6 => handle error => url includes errors
//     // 7 => will not send any request again
//     if (!error.config.url.includes("errors") && !axios.isCancel(error)) {
//       // 3 => send request with errors msgs (success)
//       // 4 => url = errors
//       // 5 => (errors server blocked)
//       await axios.post("http://localhost:9001/errors", {
//         message: error?.message,
//         endPoint: error?.config.url,
//       });
//     }
//     // if condition here to prevent sending more requests
//     // !axios.isCancel(error) => if their is no cancel to the request
//     console.log("response error", error);
//     return Promise.reject(error);
//   }
// );

// adding interceptors to higher order component to wrap the app
