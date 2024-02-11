import { createContext, useState } from "react";

export const LoadingContext = createContext("");

export default function LoadingProvider({ children }) {
  const [contextLoading, setContextLoading] = useState(false);

  return (
    <>
      <LoadingContext.Provider value={{ contextLoading, setContextLoading }}>
        {children}
      </LoadingContext.Provider>
    </>
  );
}
