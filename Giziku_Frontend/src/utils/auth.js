import { jwtDecode } from "jwt-decode";

export const getUser = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
};