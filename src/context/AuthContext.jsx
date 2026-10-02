import { createContext, useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axiosInstance from "../utils/api/axiosInstance";
import { getCurrentUser } from "../utils/api/userApi";

const AuthContext = createContext();

const persistLoggedIn = (value) => {
  if (value) {
    Cookies.set("isLoggedIn", "true", { expires: 7, sameSite: "lax" });
  } else {
    Cookies.remove("isLoggedIn");
  }
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Cookies.get("isLoggedIn") === "true"
  );
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const applyUser = useCallback((user) => {
    setUserId(user?._id ?? null);
    setUserProfile(user ?? null);
    setIsLoggedIn(true);
    persistLoggedIn(true);
  }, []);

  const clearSession = useCallback(() => {
    setUserId(null);
    setUserProfile(null);
    setIsLoggedIn(false);
    persistLoggedIn(false);
  }, []);

  const login = useCallback(
    (user) => {
      if (user) {
        applyUser(user);
        return;
      }
      setIsLoggedIn(true);
      persistLoggedIn(true);
    },
    [applyUser]
  );

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post("/users/logout");
    } catch {
      // Keep clearing local session even if the API has no logout route yet
    }
    clearSession();
  }, [clearSession]);

  useEffect(() => {
    const restoreSession = async () => {
      if (Cookies.get("isLoggedIn") !== "true") return;
      try {
        const user = await getCurrentUser();
        applyUser(user);
      } catch {
        clearSession();
      }
    };

    restoreSession();

    const onUnauthorized = () => clearSession();
    window.addEventListener("auth:unauthorized", onUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", onUnauthorized);
  }, [applyUser, clearSession]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userId, userProfile, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
