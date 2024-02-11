import { useEffect, useState } from "react";
import { Axios } from "../API/Axios";

function Comments() {
  const [comments, setComments] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1 to cancel request after leave the component
    const controller = new AbortController();

    const getComments = async () => {
      try {
        const { data } = await Axios.get("/comments", {
          // // cancel request after time
          // // its used without any controller
          // signal: AbortSignal.timeout(1000),
          // 2
          signal: controller.signal,
        });
        setComments(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getComments();

    // 3
    return () => controller.abort();
  }, []);

  if (error) return <p style={{ color: "tomato" }}>{error}</p>;

  return (
    <>{comments && comments.map(({ id, title }) => <p key={id}>{title}</p>)}</>
  );
}

export default Comments;

// cancelling with rtk
// const fetchUserById = createAsyncThunk(
//   'users/fetchById',
//   async (userId: string, thunkAPI) => {
//     const response = await fetch(`https://reqres.in/api/users/${userId}`, {
//       signal: thunkAPI.signal,
//     })
//     return await response.json()
//   }
// )
// useEffect(() =>
// const promise = dispatch(fetchUserById(4))
// return () => promise.abort();
// }, []);
