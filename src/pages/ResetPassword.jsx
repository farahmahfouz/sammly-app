import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

import { toast } from "react-hot-toast";

import ErrorIcon from "../icons/ErrorIcon";
import { resetPassword } from "../utils/api/password";
import Eye from "../icons/Eye";
import EyeSlash from "../icons/EyeSlash";
import PageTitle from "../components/PageTitle";
import { IoIosLock } from "react-icons/io";
import ArrowLeft from "../icons/ArrowLeft";

export default function ResetPassword() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const token = location.pathname.split("/").pop();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      await resetPassword(token, data.password, data.passwordConfirm); // Pass token, password, and passwordConfirm
      toast.success("Your password has been reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto border border-borderLight my-16 rounded-xl shadow-cardShadow">
      <PageTitle title="Reset Password" />

      {/* Image Section */}
      <div className="md:order-1 flex justify-center items-center rounded-xl">
        <img
          src="/resetpass.png"
          alt="Reset Password"
          className="w-full object-cover"
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:order-2 p-5 rounded-xl flex flex-col justify-evenly gap-2.5"
      >
        <div className='flex flex-col items-start'>
          <span className='block bg-surfacePurple/50 rounded-full text-primary p-4'>
            <IoIosLock className='size-6' />
          </span>
          <h1 className="text-center sm:text-start text-3xl text-textPrimary/90 font-bold">Reset Password</h1>
          <p className='text-textSecondary tracking-tighter text-sm max-w-80'>No worries! Enter your email address and we’ll send you a link to reset your password.</p>
        </div>

        <div className="">
          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-textPrimary"
            >
              New Password
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
                  } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-primary sm:text-sm hover:border-b-primaryDark`}
                placeholder="Password"
              />
              {showPassword ? (
                <EyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <Eye onClick={() => setShowPassword(true)} />
              )}
              {errors.password && <ErrorIcon />}
            </div>
            {errors.password?.type === "required" && (
              <span className="text-red-500">Password is required</span>
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
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-textPrimary"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("passwordConfirm", {
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
                type={showConfirmPassword ? "text" : "password"}
                id="passwordConfirm"
                className={`mt-1 block w-full px-3 py-2 border-b ${errors.passwordConfirm
                  ? "border-b-red-500"
                  : "border-b-gray-300"
                  } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-primary sm:text-sm hover:border-b-primaryDark`}
                placeholder="Confirm Password"
              />
              {showConfirmPassword ? (
                <EyeSlash onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <Eye onClick={() => setShowConfirmPassword(true)} />
              )}
              {errors.passwordConfirm && <ErrorIcon />}
            </div>
            {errors.passwordConfirm?.type === "required" && (
              <span className="text-red-500 text-sm">
                Please confirm your password
              </span>
            )}
            {errors.passwordConfirm?.type === "validate" && (
              <span className="text-red-500 text-sm">
                Passwords do not match
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-cardShadow text-sm text-white bg-primary hover:bg-primaryDark hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-ring loading-md"></span>
            ) : (
              "Reset Password"
            )}
          </button>
          <div className='flex gap-1 items-center pt-4 cursor-pointer' onClick={() => navigate('/login')}>
            <ArrowLeft className='size-4 text-textSecondary' />
            <p className='text-sm text-textMuted'>Back to login</p>
          </div>
        </div>
      </form>
    </div>
  );
}
