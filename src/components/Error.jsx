import { useRouteError } from "react-router-dom";
import Nav from "./Nav";

const Error = () => {
  const error = useRouteError();

  return (
    <>
      <Nav />
      <p>{error.status}</p>
      <p>{error.statusText}</p>
      <p>{error.data}</p>
    </>
  );
};

export default Error;
