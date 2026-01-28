import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  CardBody,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import signUpImage from "@/assets/images/SignUpPageimg.png";
import { useDispatch } from "react-redux";
import SearchPhoneInput from "../SearchPhoneInput";
import CaptchaDialog from "../CaptchaDialog";
import ProfileAction from "@/store/Profile/ProfileAction";

const ForgotPassword = () => {
  const [signupType, setSignupType] = useState("email");
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email:
      signupType === "email"
        ? Yup.string()
          .email("Invalid Email Address")
          .required("Email is required")
        : Yup.string(),
    phone:
      signupType === "phone"
        ? Yup.string()
          .required("Phone number is required or invalid")
        : Yup.string(),
  })

  const initValues = {
    email: "",
    phone: "",
    dialCode: "",
    countryCode: ""
  };

  return (
    <>
      {/* MAIN CONTAINER */}
      <div className="flex justify-center items-center min-h-screen bg-screen-200 px-44 font-primary">
        {/* LEFT SECTION */}
        <CardBody className="w-full md:w-1/2 px-8 py-12">
          <div className=" w-80 ">
            <h4 className="mb-6 font-semibold text-2xl text-font-900">
              Forgot Password
            </h4>
            <Formik
              initialValues={initValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
                setOpen(true);
              }}>
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
                            onChange={(e) => setFieldValue("email", e.target.value)}
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
                                setFieldValue("phone", phone)
                                setFieldValue("dialCode", dialCode)
                                setFieldValue("countryCode", countryCode)
                              }} />
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
                  <CaptchaDialog open={open} setOpen={setOpen} values={values} title="Security Verification"
                    onVerificationComplete={async () => {
                      const payloadData = {
                        register_type: signupType === "email" ? "EMAIL" : "PHONE",
                        email: signupType === "email" ? values.email : null,
                        phone: signupType === "phone" ? values.phone : null,
                        dail_code: signupType === "phone" ? values.dailCode : null,
                        country_code: signupType === "phone" ? values.countryCode : null,
                        is_register: false,
                        title: "Forgot Password"
                      };
                      console.log("Submit Payload?????", payloadData);
                      const result = await dispatch(ProfileAction.SendOtp(payloadData));
                      console.log("result>>>>", result);
                      if (result === true) {
                        navigate("/verify-otp", { state: payloadData });
                      } else {
                        setErrorMsg("Please try again !");
                      }
                    }} />
                </>
              )}
            </Formik>

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

export default ForgotPassword;
