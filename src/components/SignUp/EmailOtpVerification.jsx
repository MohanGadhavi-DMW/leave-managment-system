import React, { useEffect, useState } from "react";
import signUpImage from "@/assets/images/SignUpPageimg.png";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileAction from "@/store/Profile/ProfileAction";
import { useDispatch } from "react-redux";

const EmailOtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const signupData = location.state;
  console.log("SatteDAta>>>>>>>", signupData);

  const email = location.state?.email || "your@email.com";
  const phone = location.state?.phone || null;
  const phone_code = location.state?.phone_code || null;
  const register_type = location.state?.register_type || "EMAIL";
  const title = location.state?.title;
  const is_register = location.state?.is_register;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(32);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (is_register == undefined) navigate("/login");
  }, [])

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- OTP CHANGE ---------------- */
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  /* ---------------- BACKSPACE ---------------- */
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        document.getElementById(`otp-${index - 1}`).focus();
      }

      setOtp(newOtp);
    }
  };

  /* ---------------- VERIFY ---------------- */
  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    // console.log("VERIFY CLICKED", enteredOtp);
    const PayloadData = {
      email: email,
      phone: phone,
      phone_code: phone_code,
      otp: enteredOtp,
      register_type: register_type,
    };

    const result = await dispatch(is_register ?
      ProfileAction.VerifyOtpRegister(PayloadData) : ProfileAction.VerifyOtp(PayloadData));

    if (result?.status === "success" || result?.access_token) {
      console.log("result>>>>", result.access_token);

      // Prepare data to pass to next page
      const dataToPass = {
        ...signupData,
        token: result?.access_token,
      };
      console.log("dataToPass", dataToPass);

      navigate("/setup-password", { state: dataToPass });
    } else {
      setErrorMsg("Please try again !");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-screen-200 px-44 font-primary ">
      {/* LEFT */}
      <div className="w-full md:w-1/2 px-8 py-12">
        <p className="mb-2 text-font-900 font-semibold text-3xl">{title}</p>
        <p className="text-font-600 text-sm mb-6">Confirm, it’s you.</p>

        <p className="text-font-900 text-sm mb-2">
          Making sure you are secure.
        </p>

        <p className="text-disable-font-600 text-sm mb-4">
          We’ve sent a 6-digit code to{" "}
          <span className="text-primary-500 font-medium">{email}</span>
          <br />
          Please enter it below
        </p>

        {/* OTP BOXES */}
        <div className=" w-80">
          <div className="flex gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center rounded-md border border-border-400 text-lg text-font-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-primary-500"
              />
            ))}
          </div>

          {/* VERIFY */}
          <button onClick={handleVerify} className="primary-btn  !w-full">
            Verify
          </button>

          {errorMsg && <div className="error">{errorMsg}</div>}

          {/* TIMER */}
          <button className="outlined-btn !w-full mt-4" disabled={timer > 0}>
            {timer > 0 ? `Resending code in ${timer}` : "Didn’t get the code?"}
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex w-1/2 justify-center items-center bg-white">
        <img
          src={signUpImage}
          alt="illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default EmailOtpVerification;
