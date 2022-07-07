import { createContext, useContext, useState } from "react";

const ActivityContext = createContext(null);

export const ActivityContextProvider = ({ children }) => {
  const [activity, setActivity] = useState();
  const [initialized, setInitialized] = useState();
  const [isLoading, setIsloading] = useState();
  const [error, setError] = useState();

  const authValue = { user, setUser };
  return (
    <AuthContext.Provider value={authValue}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
