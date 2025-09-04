import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { signup } from "../api/authApi";
import mark from "../assets/mark.png";

const passwordValidationRules = {
  minLength: {
    regex: /^.{8,}$/,
    message: "Must be at least 8 characters",
  },
  hasNumber: {
    regex: /[0-9]/,
    message: "Must contain at least 1 number",
  },
  hasLowercase: {
    regex: /[a-z]/,
    message: "Must contain at least 1 lowercase letter",
  },
  hasUppercase: {
    regex: /[A-Z]/,
    message: "Must contain at least 1 uppercase letter",
  },
  hasSpecialChar: {
    regex: /[-_~!@#$%^&*`+=|;:><,.?/]/,
    message: "Must contain at least 1 special character",
  },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validatePassword = (password: string) => {
  const errors: string[] = [];
  (
    Object.keys(passwordValidationRules) as Array<
      keyof typeof passwordValidationRules
    >
  ).forEach((rule) => {
    const { regex, message } = passwordValidationRules[rule];
    if (!regex.test(password)) errors.push(message);
  });
  return errors;
};

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const features = [
    "Comprehensive threat actor directory",
    "Constantly updated threat feeds",
    "Safe source for tracking threat actors and campaigns",
    "Data funnelled from all parts of the internet",
  ];

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string[] } = {};

    if (!firstName.trim()) newErrors.firstName = ["First name is required"];
    if (!lastName.trim()) newErrors.lastName = ["Last name is required"];
    if (!email.trim()) newErrors.email = ["Email is required"];
    else if (!emailRegex.test(email)) newErrors.email = ["Invalid email"];

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) newErrors.password = passwordErrors;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const res = await signup(firstName, lastName, email, password);
        console.log("Signup success:", res);
        navigate("/login");
      } catch (err: any) {
        console.error(err);
        setErrors({
          general: [err.response?.data?.message || "Signup failed"],
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex">
      <div className="hidden lg:flex lg:w-1/2  bg-zinc-900 p-12 flex-col justify-between">
        <div className="flex flex-col space-y-12">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Falconfeeds Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-white text-xl font-semibold tracking-wide">
              FALCONFEEDS.IO
            </span>
          </div>

          <div className="max-w-lg">
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-12">
              Hunt, Identify and <span className="text-[#16A374]">Act</span> on{" "}
              <span className="text-[#EB2F2F]">threats</span> before they can
              harm you.
            </h1>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <CheckCircle className="w-5 h-5 text-[#16A374] flex-shrink-0" />
                  <span className="text-gray-300 text-lg">{feature}</span>
                </div>
              ))}
            </div>  
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <img src={mark} alt="Watermark" className="h-6 object-contain" />
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-zinc-800 p-8 lg:p-12 flex flex-col justify-center">
        <div className="lg:hidden flex items-center space-x-3 mb-12">
          <img
            src={logo}
            alt="Falconfeeds Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-white text-xl font-semibold tracking-wide">
            FALCONFEEDS.IO
          </span>
        </div>

        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold text-white mb-2">Sign up</h2>
          <p className="text-[#737373] mb-4">
            Get started right away, noe credit card required!
          </p>

          {errors.general && (
            <div className="mb-4 text-red-500 text-sm font-medium">
              {errors.general[0]}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter first name"
              />
              {errors.firstName?.map((err, idx) => (
                <p key={idx} className="text-red-500 text-sm mt-1">
                  {err}
                </p>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter last name"
              />
              {errors.lastName?.map((err, idx) => (
                <p key={idx} className="text-red-500 text-sm mt-1">
                  {err}
                </p>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter email"
              />
              {errors.email?.map((err, idx) => (
                <p key={idx} className="text-red-500 text-sm mt-1">
                  {err}
                </p>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password?.map((err, idx) => (
                <p key={idx} className="text-red-500 text-sm mt-1">
                  {err}
                </p>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#16A374] hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200  transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>

            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-600"></div>
              </div>
              <div className="relative bg-zinc-800 px-4">
                <span className="text-gray-400 text-sm">or</span>
              </div>
            </div>
            <button
              type="button"
              className="w-full bg-[#4285F4] hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3"
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

          <div className="mt-8 text-center text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#16A374] hover:text-teal-300 font-medium"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
