import { useEffect, useState } from "react";
import { Axios } from "../API/Axios";

function Posts() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1 to cancel request after leave the component
    const controller = new AbortController();

    const getPosts = async () => {
      setLoading(true);
      try {
        const { data } = await Axios.get("/posts", {
          // // cancel request after time
          // // its used without any controller
          // signal: AbortSignal.timeout(1000),

          // 2
          signal: controller.signal,
        });
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    getPosts();

    // 3
    return () => controller.abort();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "tomato" }}>{error}</p>}
      {posts && posts.map(({ id, title }) => <p key={id}>{title}</p>)}
    </>
  );
}

export default Posts;
