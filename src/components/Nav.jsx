import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="posts">Posts</NavLink>
      <NavLink to="comments">Comments</NavLink>
    </div>
  );
};

export default Nav;
