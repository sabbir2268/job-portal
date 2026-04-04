import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import registerAnimation from "../assets/lottie/register.json";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name,
        });

        setUser({
          ...user,
          displayName: name,
        });

        console.log(user);
        navigate("/");
        alert(`Welcome ${name}, your account is created`);
      })
      .catch((error) => {
        console.log(error.message, error.code);
      });
  };
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("Google login successful");
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error?.message || error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 relative">
      {/* HOME BUTTON */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="btn btn-sm btn-primary">
          ← Home
        </Link>
      </div>

      <div className="w-full max-w-4xl bg-base-100 p-6 md:p-10 rounded-2xl shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* LEFT: LOTTIE */}
        <div className="w-48 md:w-64 mx-auto">
          <Lottie animationData={registerAnimation} loop />
        </div>

        {/* RIGHT: FORM */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold text-center lg:text-left mb-6">
            Create Account 🚀
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* NAME */}
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                autoComplete="username"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="Create a password"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="Confirm your password"
                className="input input-bordered w-full"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Register
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn w-full border border-base-300 bg-white text-black hover:bg-gray-100"
          >
            Continue with Google
          </button>

          <p className="text-center lg:text-left text-sm mt-6">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
