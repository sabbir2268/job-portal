import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../assets/lottie/login.json";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigate(from, { replace: true });
        alert(`${user.displayName} logged in successfully`);
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
          <Lottie animationData={loginAnimation} loop />
        </div>

        {/* RIGHT: FORM */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold text-center lg:text-left mb-6">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
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
                autoComplete="current-password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />

              <div className="text-right mt-1">
                <Link
                  to="/auth/forgotPassword"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Login
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
            Don’t have an account?{" "}
            <Link to="/auth/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
