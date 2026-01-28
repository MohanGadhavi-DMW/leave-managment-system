import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CardBody } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import GoogleIcons from "@/assets/icons/google-logo.svg";
import signUpImage from "@/assets/images/SignUpPageimg.png";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { useDispatch } from "react-redux";
import SearchPhoneInput from "../SearchPhoneInput";
import CaptchaDialog from "../CaptchaDialog";
import ProfileAction from "@/store/Profile/ProfileAction";

const SignUp = () => {
  const [signupType, setSignupType] = useState("email");
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google User:", result.user);
      // Handle successful login here
    } catch (error) {
      console.error("Google login error:", error);

      // Handle different error types
      if (error.code === "auth/user-cancelled") {
        // User cancelled - don't show error, just silently fail
        console.log("User cancelled Google sign-in");
      } else if (error.code === "auth/popup-closed-by-user") {
        // Popup was closed
        console.log("Google sign-in popup was closed");
      } else {
        // Other errors - show to user
        alert(`Google login failed: ${error.message}`);
      }
    }
  };

  const validationSchema = Yup.object({
    email:
      signupType === "email"
        ? Yup.string()
            .email("Invalid Email Address")
            .required("Email is required")
        : Yup.string(),
    phone:
      signupType === "phone"
        ? Yup.string().required("Phone number is required or invalid")
        : Yup.string(),
  });

  const initValues = {
    email: "",
    phone: "",
    dialCode: "",
    countryCode: "",
  };

  return (
    <>
      {/* MAIN CONTAINER */}
      <div className="flex justify-center items-center min-h-screen bg-screen-200 px-44 font-primary">
        {/* LEFT SECTION */}
        <CardBody className="w-full md:w-1/2 px-8 py-12">
          <div className=" w-80 ">
            <h4 className="mb-6 font-semibold text-2xl text-font-900">
              Sign Up With
            </h4>
            <Formik
              initialValues={initValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
                setOpen(true);
              }}
            >
              {({ values, setFieldValue, setValues }) => (
                <>
                  {/* TOGGLE */}
                  <div className="flex gap-3 mb-5">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        checked={signupType === "email"}
                        onChange={() => {
                          setValues(initValues);
                          setSignupType("email");
                        }}
                      />
                      Email Address
                    </label>

                    <span className="text-gray-400">/</span>

                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        checked={signupType === "phone"}
                        onChange={() => {
                          setValues(initValues);
                          setSignupType("phone");
                        }}
                      />
                      Phone No.
                    </label>
                  </div>

                  <Form style={{ maxWidth: 360 }}>
                    {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}

                    {/* EMAIL INPUT */}
                    {signupType === "email" && (
                      <div className="mb-3 flex flex-col">
                        <label className="flex flex-col gap-2">
                          Email Address
                          <input
                            name="email"
                            placeholder="Email Address"
                            value={values.email}
                            onChange={(e) =>
                              setFieldValue("email", e.target.value)
                            }
                            className="px-5 py-3 rounded-md text-sm"
                          />
                        </label>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-2"
                        />
                      </div>
                    )}
                    {/* PHONE INPUT */}
                    {signupType === "phone" && (
                      <div className="mb-3 flex flex-col">
                        <label className="flex flex-col gap-2">
                          Phone No
                          <div className="w-full flex gap-2">
                            <SearchPhoneInput
                              defaultCountryCode="in"
                              defaultValue={values.phone}
                              onChange={({ phone, dialCode, countryCode }) => {
                                setFieldValue("phone", phone);
                                setFieldValue("dialCode", dialCode);
                                setFieldValue("countryCode", countryCode);
                              }}
                            />
                          </div>
                        </label>

                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-xs mt-2"
                        />
                      </div>
                    )}

                    {errorMsg && <div className="error">{errorMsg}</div>}

                    {/* VERIFY BUTTON */}
                    <button type="submit" className="primary-btn w-full mt-4">
                      Verify
                    </button>
                  </Form>
                  <CaptchaDialog
                    open={open}
                    setOpen={setOpen}
                    values={values}
                    title="Security Verification"
                    onVerificationComplete={async () => {
                      const payloadData = {
                        register_type:
                          signupType === "email" ? "EMAIL" : "PHONE",
                        email: signupType === "email" ? values.email : null,
                        phone: signupType === "phone" ? values.phone : null,
                        dail_code:
                          signupType === "phone" ? values.dailCode : null,
                        country_code:
                          signupType === "phone" ? values.countryCode : null,
                        is_register: true,
                        title: "Sign Up",
                      };
                      console.log("Submit Payload?????", payloadData);
                      const result = await dispatch(
                        ProfileAction.SendOtp(payloadData),
                      );
                      console.log("result>>>>", result);
                      if (result === true) {
                        navigate("/verify-otp", { state: payloadData });
                      } else {
                        setErrorMsg("Please try again !");
                      }
                    }}
                  />
                </>
              )}
            </Formik>

            {/* OR */}
            <div className="flex items-center my-5 ">
              <hr className="grow border-[#C7DBED]" />
              <span className="px-2 text-normal text-gray-500">OR</span>
              <hr className="grow border-[#C7DBED]" />
            </div>

            {/* GOOGLE SIGN IN */}
            <button
              className="flex items-center justify-center gap-2 outlined-btn !rounded-md w-full"
              onClick={handleGoogleLogin}
            >
              <img src={GoogleIcons} alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
          </div>
        </CardBody>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex w-1/2 justify-center items-center bg-white">
          <img
            src={signUpImage}
            alt="illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
