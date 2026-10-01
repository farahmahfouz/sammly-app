import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PiUserGearFill } from "react-icons/pi";
import "react-toastify/dist/ReactToastify.css";

import FormField from "./FormField";
import useSignUp from "./useSignUp";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  const { signUp, isLoading } = useSignUp();

  const onSubmit = (data) => {
    signUp(data, {
      onError: (err) => {
        if (err.response?.data?.message === "Email already exists") {
          setError("email", { type: "manual", message: "Email already exists" });
        }
      },
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:p-6 rounded-2xl md:shadow-cardShadow md:border border-borderLight flex flex-col gap-4"
      >
        <div className="flex items-center gap-2 justify-center text-center">
          <PiUserGearFill className="text-primaryDark bg-surfaceLavender p-2 size-11 rounded-full" />
          <div className="flex flex-col">
            <p className="tracking-tight text-3xl text-textPrimary font-bold">
              Create Account
            </p>
            <p className="text-textMuted tracking-tighter text-sm">
              Fill in your details to get started
            </p>
          </div>
        </div>

        <FormField
          id="name"
          label="Name"
          placeholder="Enter name"
          error={errors.name}
          registration={register("name", {
            required: "Name is required",
            minLength: { value: 3, message: "Name must be at least 3 characters" },
            maxLength: { value: 100, message: "Name must be at most 100 characters" },
          })}
        />

        <FormField
          id="email"
          label="Email address"
          type="email"
          placeholder="Enter email"
          error={errors.email}
          registration={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          error={errors.password}
          registration={register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
            maxLength: { value: 30, message: "Password must be at most 30 characters" },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            },
          })}
        />

        <FormField
          id="passwordConfirm"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          error={errors.passwordConfirm}
          registration={register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
        />

        <FormField
          id="address"
          label="Address"
          placeholder="Enter address"
          error={errors.address}
          registration={register("address", {
            required: "Address is required",
            minLength: { value: 3, message: "Address must be at least 3 characters" },
            maxLength: { value: 100, message: "Address must be at most 100 characters" },
          })}
        />

        <FormField
          id="phone"
          label="Phone Number"
          placeholder="Enter phone number"
          error={errors.phone}
          registration={register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^(01)[0-2,5]{1}[0-9]{8}$/,
              message: "Invalid Egyptian phone number (e.g., 01012345678)",
            },
          })}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-cardShadow text-sm font-bold text-white bg-primary hover:bg-primaryDark hover:transition-all focus:outline-none"
        >
          {isLoading ? (
            <span className="loading loading-ring loading-md"></span>
          ) : (
            "Register"
          )}
        </button>

        <p className="text-center mt-auto tracking-tight text-sm">
          Already have account?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Login
          </Link>
        </p>
      </form>
    </>
  );
}