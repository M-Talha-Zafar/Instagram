import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "./UserContext";
import { useSnackbar } from "./SnackbarContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setUser } = useUserContext();
  const { showSnackbar } = useSnackbar();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/login`,
      formData
    );
    const user = response.data;
    localStorage.setItem("user-token", user.token);
    setUser(user);
    await verifyToken();
  };

  const signup = async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/signup`,
      formData
    );

    const user = response.data;
    localStorage.setItem("user-token", user.token);
    setUser(user);

    await verifyToken();
  };

  const logout = async () => {
    localStorage.removeItem("user-token");
    await verifyToken();
  };

  const verifyToken = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("user-token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      if (token) {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/verify-token`,
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
    <AuthContext.Provider
      value={{ verifyToken, isAuthenticated, isLoading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
