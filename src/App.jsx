import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Comments from "./components/Comments";
import Error from "./components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts", element: <Posts /> },
      { path: "comments", element: <Comments /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
