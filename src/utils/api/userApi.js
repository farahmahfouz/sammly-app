import axiosInstance from "./axiosInstance";

export const signUp = async (data) => {
  const res = await axiosInstance.post(`users/signup`, data);
  return res.data.data.user;
};

export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/users/me");
  return res.data.data.user;
};

export const login = async (data) => {
  const res = await axiosInstance.post("/users/login", data);
  return res.data.data.user;
};

export const logout = async () => {
  await axiosInstance.post("/users/logout");
};
