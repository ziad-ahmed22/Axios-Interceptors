import { useEffect } from "react";
import { Axios } from "../API/Axios";
import axios from "axios";

const AxiosInterceptor = ({ children }) => {
  useEffect(() => {
    const requestInterceptor = Axios.interceptors.request.use(
      (config) => {
        if (config.url.includes("posts")) {
          // config.url = "`${config.url}&fireEvent=true`";
          console.log(config.url); // /posts
        }
        console.log("request done");
        return config;
      },
      (error) => {
        console.log("request error", error);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = Axios.interceptors.response.use(
      (response) => {
        console.log("response done", response);
        return response;
      },
      async (error) => {
        if (!error.config.url.includes("errors") && !axios.isCancel(error)) {
          await axios.post("http://localhost:9001/errors", {
            message: error?.message,
            endPoint: error?.config.url,
          });
          //  you can use dispatch from rtk
        }
        console.log("response error", error);
        return Promise.reject(error);
      }
    );

    //  remove interceptor
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return <>{children}</>;
};

export default AxiosInterceptor;
