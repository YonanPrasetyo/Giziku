import { createContext, useState, useEffect, useCallback } from "react";
import authService from "../services/authService";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const getUserFromToken = (token) => {
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const decoded = getUserFromToken(token);

        if (decoded) {
          setUser(decoded);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await authService.login({ email, password });

      const token = response.data.accessToken;

      localStorage.setItem("accessToken", token);

      const decoded = getUserFromToken(token);

      setUser(decoded);
      setIsAuthenticated(true);

      return response;
    } catch (err) {
      const errorMessage = err?.message || "Login gagal";
      setError(errorMessage);
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (username, email, password) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await authService.register({
        username,
        email,
        password,
      });

      return response;
    } catch (err) {
      const errorMessage = err?.message || "Register gagal";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);

      await authService.logout();

      localStorage.removeItem("accessToken");

      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      setError(err?.message || "Logout gagal");

      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}