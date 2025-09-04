import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { login } from "../api/authApi"; 
import { useNavigate } from "react-router-dom"; 
import logo from '../assets/logo.png'
import SplashScreen from "../components/SplashScreen";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(false);

  // store all field errors in one object
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const navigate = useNavigate();

  const features = [
    "Comprehensive threat actor directory",
    "Constantly updated threat feeds",
    "Safe source for tracking threat actors and campaigns",
    "Data funnelled from all parts of the internet",
  ];

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let valid = true;

    // email validation
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    // password validation
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } 

    setErrors(newErrors);
    return valid;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await login(email, password);

      if (res?.accessToken) {
        console.log("Login success ");
        setShowSplash(true);
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 2000);
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {
      console.error("Login failed", err);
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in attempted");
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <div className="min-h-screen bg-zinc-900 flex">
          {/* Left Panel */}
          <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 p-12 flex-col justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Falconfeeds Logo" className="w-8 h-8 object-contain" />
              <span className="text-white text-xl font-semibold tracking-wide">
                FALCONFEEDS.IO
              </span>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center max-w-lg">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-12">
                Hunt, Identify and{" "}
                <span className="text-teal-400">Act</span> on{" "}
                <span className="text-red-400">threats</span> before they can harm
                you.
              </h1>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm">Powered by</span>
              <span className="text-sm font-medium">technisanct</span>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-1/2 bg-zinc-800 p-8 lg:p-12 flex flex-col justify-center">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center space-x-3 mb-12">
              <img src={logo} alt="Falconfeeds Logo" className="w-8 h-8 object-contain" />
              <span className="text-white text-xl font-semibold tracking-wide">
                FALCONFEEDS.IO
              </span>
            </div>

            <div className="max-w-md mx-auto w-full">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Sign in</h2>
                <p className="text-gray-400">View latest updates and developments in CTI</p>
              </div>

              {/* Server Error */}
              {error && <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>}

              {/* Form */}
              <form onSubmit={handleSignIn} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 bg-zinc-700 border ${
                      errors.email ? "border-red-500" : "border-zinc-600"
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      errors.email ? "focus:ring-red-500" : "focus:ring-teal-500"
                    } focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-4 py-3 pr-12 bg-zinc-700 border ${
                        errors.password ? "border-red-500" : "border-zinc-600"
                      } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.password ? "focus:ring-red-500" : "focus:ring-teal-500"
                      } focus:border-transparent transition-all duration-200`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-600"></div>
                  </div>
                  <div className="relative bg-zinc-800 px-4">
                    <span className="text-gray-400 text-sm">or</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <span className="text-gray-400">Don't have an account? </span>
                <button
                  className="text-teal-400 hover:text-teal-300 font-medium transition-colors "
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
