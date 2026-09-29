import LoginForm from "../features/auth/LoginForm";

export default function Login() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] container mx-auto py-12">
      <div className="md:order-1 flex items-center">
        <img src="/login.png" alt="Login" className="object-cover" />
      </div>
      <LoginForm />
    </div>
  )
}