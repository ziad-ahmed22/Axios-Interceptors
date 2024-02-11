import { useEffect, useState } from "react";
import { Axios } from "../API/Axios";

function Posts() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1 to cancel request after leave the component
    const controller = new AbortController();

    const getPosts = async () => {
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
    };
    getPosts();

    // 3
    return () => controller.abort();
  }, []);

  if (error) return <p style={{ color: "tomato" }}>{error}</p>;

  return <>{posts && posts.map(({ id, title }) => <p key={id}>{title}</p>)}</>;
}

export default Posts;
