import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const refreshUser = async () => {
    if (!user) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user?._id}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
