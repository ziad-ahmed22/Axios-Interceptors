import { useContext, useEffect } from "react";
import { Axios, AxiosError } from "../API/Axios";
import axios from "axios";
import { LoadingContext } from "./LoadingContext";

const AxiosInterceptor = ({ children }) => {
  // ============================================================
  // Adding Loading Before All Requests
  const { setContextLoading } = useContext(LoadingContext);

  useEffect(() => {
    const requestInterceptor = Axios.interceptors.request.use(
      (config) => {
        setContextLoading(true);
        return config;
      },

      (error) => {
        setContextLoading(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = Axios.interceptors.response.use(
      (response) => {
        setContextLoading(false);
        return response;
      },

      (error) => {
        setContextLoading(false);
        return Promise.reject(error);
      }
    );

    //  remove interceptor
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [setContextLoading]);

  // ============================================================
  // Adding Server Errors TO A New Server Data
  useEffect(() => {
    const requestInterceptor = Axios.interceptors.request.use(
      (config) => {
        if (config.url.includes("posts")) {
          console.log("config.url", config.url); // /posts
          // config.url = `http://localhost:5173${config.url}&fireEvent=true`;
        }
        console.log("request done", config);
        return config;
      },
      (error) => {
        console.log("request error", error);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = Axios.interceptors.response.use(
      (response) => {
        // 1 => response will fail (posts server blocked) => url = posts
        console.log("response done", response);
        return response;
      },
      async (error) => {
        // 2 => handle error => url don't includes errors
        // 6 => handle error => url includes errors
        // 7 => will not send any request again
        if (!error.config.url.includes("errors") && !axios.isCancel(error)) {
          // 3 => send request with errors msgs (success)
          // 4 => url = errors
          // 5 => (errors server blocked)
          await AxiosError.post("/errors", {
            message: error?.message,
            endPoint: error?.config.url,
          });
          //  you can use dispatch from rtk
        }

        // if condition here to prevent sending more requests
        // !axios.isCancel(error) => if their is no cancel to the request
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

  // ============================================================

  return <>{children}</>;
};

export default AxiosInterceptor;
