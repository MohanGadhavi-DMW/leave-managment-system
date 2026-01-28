import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleIcons from "@/assets/icons/google-logo.svg";
import ShowPasswordIcon from "@/assets/icons/ShowPassword.svg";
import HidePassword from "@/assets/icons/HidePassword.svg";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "@/Layout/AuthLayout";
import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";
import AuthAction from "@/store/Auth/AuthAction";
import Headers from "@/constant/Headers";
import { useDispatch } from "react-redux";

export default function Login() {
  const location = useLocation();
  const loginData = location.state;

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(loginData?.message);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => setMessage(undefined), 8000);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google User:", result.user);
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login error:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "novel.gomes@gmail.com",
      password: "Abc@123#",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6).required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setErrorMsg("");
      setLoading(true);
      const payload = {
        email: values.email,
        password: values.password,
        phone: "",
        otp: "",
      };

      try {
        const result = await dispatch(AuthAction.login(payload));
        if (result?.status === "success") {
          navigate("/dashboard");
        } else {
          // Extract server error message from known shapes
          const serverMessage =
            result?.message ||
            result?.error?.[0]?.errorMessage ||
            result?.errors?.[0]?.errorMessage ||
            result?.data?.errors?.[0]?.errorMessage ||
            result?.errors?.[0] ||
            "Invalid credentials or unable to login.";
          setErrorMsg(serverMessage);
        }
      } catch (err) {
        console.error("Login error:", err);
        setErrorMsg(err?.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout>
      <div className="w-80">
        <h1 className="mb-2 font-bold text-4xl">Welcome User</h1>
        <p className="mb-8 text-base text-gray-600">Sign in to your account</p>
        {message && (
          <div className=" text-deep-orange-300 text-sm my-3 font-bold ">
            {message}
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="w-80">
            <input
              name="email"
              placeholder="Email Address"
              className="w-full px-5 py-3  rounded-md text-sm mb-4"
              {...formik.getFieldProps("email")}
            />
          </div>

          {/* Password */}
          <div className="w-full mb-4 flex flex-col ">
            <div className="relative w-full flex flex-row justify-center align-middle">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 pr-12  rounded-md text-sm"
                {...formik.getFieldProps("password")}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? HidePassword : ShowPasswordIcon}
                  className="w-5"
                />
              </button>
            </div>
            <p className="w-full flex justify-end mt-2 text-sm ">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/forgot-password");
                }}
                className="text-[#1D4ED8] font-semibold hover:underline"
              >
                Forgot Password ?
              </button>
            </p>
          </div>
          <button
            className={`primary-btn w-full ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading || formik.isSubmitting}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          {errorMsg && (
            <div className="text-sm text-red-600 mt-3">{errorMsg}</div>
          )}
        </form>
        {/* Register Link */}
        <p className="mt-4 text-sm text-left text-gray-600 w-full max-w-sm">
          Don’t have an account? please{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
            className="text-[#1D4ED8] font-semibold hover:underline"
          >
            Register
          </button>
        </p>
        {/* OR */}
        <div className="flex items-center my-6 ">
          <hr className="flex-1" />
          <span className="px-2 text-sm">OR</span>
          <hr className="flex-1" />
        </div>
        <button
          className=" outlined-btn !flex justify-center gap-2 !rounded-md w-full "
          onClick={handleGoogleLogin}
        >
          <img src={GoogleIcons} className="w-5" />
          Sign in with Google
        </button>
      </div>
    </AuthLayout>
  );
}
