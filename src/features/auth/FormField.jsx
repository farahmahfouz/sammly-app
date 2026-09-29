import { useState } from "react";
import Eye from "../../icons/Eye";
import EyeSlash from "../../icons/EyeSlash";

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  error,
  registration,
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-textPrimary">
        {label}
      </label>

      <div className="relative">
        <input
          {...registration}
          id={id}
          type={isPassword && show ? "text" : type}
          placeholder={placeholder}
          className={`mt-1 block w-full px-3 py-2 border-b ${
            error ? "border-b-red-600" : "border-b-gray-300"
          } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-indigo-500 sm:text-sm hover:border-b-primary`}
        />
        {isPassword &&
          (show ? (
            <EyeSlash onClick={() => setShow(false)} />
          ) : (
            <Eye onClick={() => setShow(true)} />
          ))}
      </div>

      {error && <span className="text-red-600 text-sm">{error.message}</span>}
    </div>
  );
}