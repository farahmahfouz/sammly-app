import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

import AuthContext from "../context/AuthContext";

//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//icons
import Eye from "./../icons/Eye";
import EyeSlash from "./../icons/EyeSlash";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get("redirect");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4001/api/v1/users/login",
        data
      );
      toast.success("Logged In Successfully");
      login(res.data.data.token);
      if (redirect) {
        navigate(`/${redirect}`);
      } else {
        navigate("/"); // Redirect to home page if no redirect parameter
      }
    } catch (error) {
      if (error.response?.data?.message === "Invalid email or password") {
        setError("email", {
          type: "manual",
          message: "Invalid email or password",
        });
        setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
      } else {
        toast.error("Login failed");
        setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto  m-9 rounded-xl p-5 shadow-[0px_0px_3px_3px_#fbfbfb] h-4/5">
      {/* Image Section */}
      <div className="md:order-1 flex justify-center items-center rounded-xl">
        <img
          src="/brand3.jpg"
          alt="Login"
          className=" rounded-xl h-5/5"
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:order-2 p-5 rounded-xl flex flex-col justify-evenly"
      >
        <div>
          <h1 className="text-center  text-3xl pb-6 text-textColor font-bold">
            Log In
          </h1>
        </div>

        <div className="">
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-textColor"
            >
              Email address
            </label>
            <div className="relative">
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                type="email"
                id="email"
                className={`mt-1 block w-full px-3 py-2 border-b ${errors.email ? "border-b-red-500" : "border-b-gray-300"
                  } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-indigo-500 sm:text-sm hover:border-b-textColor`}
                placeholder="Enter email"
              />
            </div>
            {errors.email?.type === "required" && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-red-500 text-sm">Invalid email address</span>
            )}
            {errors.email?.type === "manual" && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-textColor"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 30,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                })}
                type={showPassword ? "text" : "password"}
                id="password"
                className={`mt-1 block w-full px-3 py-2 border-b ${errors.password ? "border-b-red-500" : "border-b-gray-300"
                  } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-indigo-500 sm:text-sm hover:border-b-textColor`}
                placeholder="Password"
              />
              {showPassword ? (
                <EyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <Eye onClick={() => setShowPassword(true)} />
              )}
            </div>
            {errors.password?.type === "required" && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500 text-sm">
                Password must be at least 8 characters
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-500 text-sm">
                Password must be at most 30 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500 text-sm">
                Password must contain at least one uppercase letter, one
                lowercase letter, and one number
              </span>
            )}
            {errors.password?.type === "manual" && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          <p className="text-end ">
            <Link
              to="/forget-password"
              className="font-bold text-textColor"
            >
              Forget Password
            </Link>
          </p>

          {/* is loading button */}
          <button
            type="submit"
            className="w-full mt-3 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-buttonColor hover:bg-hoverButton hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hoverButton"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-ring loading-md"></span>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center mt-5">
            {`Don't have an account?`}{" "}
            <Link to="/sign-up" className="font-bold text-textColor">
              Signup
            </Link>
          </p>

        </div>
      </form>
    </div>
  );
}