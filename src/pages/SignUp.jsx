import "react-toastify/dist/ReactToastify.css";
import SignUpForm from "../features/auth/signUpForm";
import PageTitle from "../components/PageTitle";

export default function Signup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] container mx-auto py-6">
      <PageTitle title="Sign Up" />

      {/* Image Section */}
      <div className="md:order-1 flex flex-col">
        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-4xl tracking-tighter font-extrabold leading-tight">
            Create your
            <span className="block text-primaryDark">account</span>
          </h1>
          <p className="max-w-96 text-textMuted tracking-tight">
            Join our community and start creating custom T-shirts, expressing
            your style and sharing your creativity!
          </p>
        </div>
        <img
          src="signup.png"
          alt="Sign Up"
          className="w-4/5 object-cover rounded-bl-badge rounded-br-[198px]"
        />
      </div>
      <SignUpForm />
    </div>
  )
}
