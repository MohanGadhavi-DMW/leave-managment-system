import React, { useEffect, useRef, useState } from "react";
import loginImage from "@/assets/images/SignUpPageimg.png";

import ShowPasswordIcon from "@/assets/icons/ShowPassword.svg";
import HidePasswordIcon from "@/assets/icons/HidePassword.svg";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileAction from "@/store/Profile/ProfileAction";
import { useDispatch } from "react-redux";
import Label from "../Label";

// Password rules
const rules = [
  { id: "min8", label: "Minimum 8 characters", test: (s) => s.length >= 8 },
  {
    id: "upper",
    label: "One uppercase character",
    test: (s) => /[A-Z]/.test(s),
  },
  {
    id: "lower",
    label: "One lower case character",
    test: (s) => /[a-z]/.test(s),
  },
  { id: "numeric", label: "One numeric number", test: (s) => /[0-9]/.test(s) },
  {
    id: "special",
    label: "One special character {!@#$%&*()}",
    test: (s) => /[!@#$%^&*()_+\-=[\]{};:"\\|,.<>/?]/.test(s),
  },
];

const SetupPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const signupData = location.state;
  const is_register = location.state?.is_register;

  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [validMap, setValidMap] = useState({});
  const [focused, setFocused] = useState(false);

  const hideTimeout = useRef(null);

  useEffect(() => {
    if (is_register == undefined) navigate("/login");
  }, []);

  useEffect(() => {
    const map = {};
    rules.forEach((r) => (map[r.id] = r.test(password)));
    setValidMap(map);
  }, [password]);

  const allValid =
    Object.values(validMap).every(Boolean) && password.length > 0;
  const passwordsMatch = password === confirm && confirm.length > 0;

  const handleFocus = () => {
    clearTimeout(hideTimeout.current);
    setFocused(true);
  };

  const handleBlur = () => {
    hideTimeout.current = setTimeout(() => setFocused(false), 150);
  };

  const handelSetPassword = async () => {
    try {
      const payload = {
        email: signupData?.email,
        password,
      };

      const response = await dispatch(
        is_register
          ? ProfileAction.SetPassword(payload)
          : ProfileAction.ResetPassword(payload),
      );

      // ProfileAction now returns the normalized result object (not raw axios status).
      // Check for common success indicators (access_token, data.token, next_step, token_type, or status === 'success')

      if (response?.status === "success" && response?.data == "success") {
        const dataToPass = {
          ...signupData,
          message: is_register
            ? "You are successfully registered, Please login !"
            : "Password has been changed successfuly, please login with your new Password",
          password,
        };
        navigate("/login", { state: dataToPass });
      }
    } catch (error) {
      console.error("Error setting password:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-screen-200 px-44 font-primary">
      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT FORM */}
        <div className="max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Setup password</h2>

          {/* SUCCESS ALERT */}
          {is_register && (
            <div className="mb-5 flex items-start justify-between rounded-md border border-green-200 bg-[#E6FFF4] px-4 py-3 text-sm text-[#7E8795] w-80">
              <span>Your email address has been successfully verified</span>
              <span className="font-bold cursor-pointer">×</span>
            </div>
          )}

          <div className="space-y-5">
            {/* PASSWORD */}
            <div className="relative">
              <Label text="Password" required={true} />
              <div className="relative w-80">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="w-full rounded-md border border-blue-gray-100 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />

                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  <img
                    src={showPassword ? HidePasswordIcon : ShowPasswordIcon}
                    className="w-5 h-5"
                    alt=""
                  />
                </span>
              </div>

              {/* VALIDATION POPUP */}
              {(focused || password.length > 0) && !allValid && (
                <div className="absolute left-0 top-full mt-2 w-72 rounded-lg border bg-white p-4 shadow-lg z-30">
                  <ul className="space-y-2">
                    {rules.map((r) => {
                      const ok = validMap[r.id];
                      return (
                        <li key={r.id} className="flex gap-3 items-start">
                          {/* SINGLE DOT (NO DOUBLE COLOR) */}
                          <span
                            className={`mt-1.5 h-2.5 w-2.5 rounded-full ${
                              ok ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              ok ? "text-[#02AA7F]" : "text-gray-400"
                            }`}
                          >
                            {r.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <Label text="Confirm password" required={true} />
              <div className="relative w-80">
                <input
                  required
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full rounded-md border border-blue-gray-100 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />

                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirm((s) => !s)}
                >
                  <img
                    src={showConfirm ? HidePasswordIcon : ShowPasswordIcon}
                    className="w-5 h-5"
                    alt=""
                  />
                </span>
              </div>
            </div>

            {/* NEXT BUTTON */}
            <button
              disabled={!allValid || !passwordsMatch}
              className={`w-80 rounded-md py-2.5 text-sm font-medium text-white ${
                allValid && passwordsMatch
                  ? "bg-brand-primary hover:bg-brand-primary-400"
                  : "bg-brand-200 cursor-not-allowed"
              }`}
              onClick={handelSetPassword}
            >
              Next
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex justify-end">
          <img src={loginImage} alt="illustration" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default SetupPassword;
