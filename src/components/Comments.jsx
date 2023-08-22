import { useEffect, useState } from "react";
import { Axios } from "../API/Axios";

function Comments() {
  const [comments, setComments] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1 to cancel request after leave the component
    const controller = new AbortController();

    const getComments = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    getComments();

    // 3
    return () => controller.abort();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "tomato" }}>{error}</p>}
      {comments && comments.map(({ id, title }) => <p key={id}>{title}</p>)}
    </>
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
