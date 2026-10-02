import axiosInstance from "./axiosInstance";

export const sendResetPasswordEmail = async (email) => {
  try {
    const response = await axiosInstance.post("/users/forgot-password", {
      email,
    });
    return response.data;
  } catch (error) {
    console.log("FORGOT PASSWORD ERROR:", error.response?.data);
    console.log("STATUS:", error.response?.status);
    console.log("FULL ERROR:", error);

    throw error.response?.data || error.message;
  }
};

export const resetPassword = async (token, password, passwordConfirm) => {
  try {
    const response = await axiosInstance.patch(
      `/users/reset-password/${token}`,
      {
        password,
        passwordConfirm,
      },
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
