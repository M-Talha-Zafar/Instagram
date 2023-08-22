import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "./UserContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setUser } = useUserContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/login`,
      formData
    );
    const user = response.data;
    localStorage.setItem("user-token", JSON.stringify(user.token));
    setUser(user);
    await verifyToken();
  };

  const logout = () => {
    try {
      localStorage.removeItem("user-token");
      verifyToken();
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const verifyToken = async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("user-token"));
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      if (token) {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/verify-token`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const user = response.data.user;
        if (user) setUser(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
