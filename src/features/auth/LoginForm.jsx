import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import FormField from "./FormField";
import useLogin from "./useLogin";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isPending } = useLogin();

  const onSubmit = (data) => login(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:order-2 p-6 rounded-2xl shadow-cardShadow border border-borderLight flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2 items-start">
        <div className="text-xs font-semibold tracking-tight text-primary capitalize bg-surfaceLavender py-1 px-3 rounded-full">
          login to your account
        </div>
        <h1 className="text-3xl tracking-wide font-bold leading-tight">
          Welcome <span className="text-primaryDark">Back</span>
        </h1>
        <p className="max-w-96 text-textMuted tracking-tight text-sm">
          Sign in to your account and continue creating amazing designs.
        </p>
      </div>

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

      <p className="text-end">
        <Link
          to="/forget-password"
          className="text-sm tracking-tighter text-primary hover:text-primaryDark"
        >
          Forget Password?
        </Link>
      </p>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-cardShadow text-sm font-bold text-white bg-primary hover:bg-primaryDark hover:transition-all focus:outline-none"
      >
        {isPending ? (
          <span className="loading loading-ring loading-md"></span>
        ) : (
          "Login"
        )}
      </button>

      <p className="text-center mt-auto tracking-tight text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/sign-up" className="font-semibold text-primary">
          Signup
        </Link>
      </p>
    </form>
  );
}