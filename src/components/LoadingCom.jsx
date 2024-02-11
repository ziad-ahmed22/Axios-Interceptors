import { useContext } from "react";
import { LoadingContext } from "./LoadingContext";

export default function LoadingCom() {
  const { contextLoading } = useContext(LoadingContext);

  if (contextLoading) return <p className="context-loading">Loading...</p>;

  return null;
}
