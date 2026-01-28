import React, { useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorAction from "./store/Error/ErrorAction";
import { isNullObject, isNullorEmpty } from "./utils/ObjectHelper";
import Register from "./Components/SignUp";
import AppLayout from "./Layout/AppLayout";
import Login from "./Pages/Login";
import { routes } from "./routes.jsx";
import SessionUtility from "./constant/SessionUtility";
import AuthAction from "./store/Auth/AuthAction";
import AlertAction from "./store/Alert/AlertAction";
import EmailOtpVerification from "./Components/SignUp/EmailOtpVerification";
import SetupPassword from "./Components/SignUp/SetupPassword";
import ForgotPassword from "./Components/ForgotPassword";

const getOnLineStatus = () =>
  typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;

const AppRoute = () => {
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth);
  const isLogin = !isNullObject(SessionUtility.GetItem(AuthAction.TOKEN))
    ? true
    : authStore.isLogin;
  const isDebug = authStore.isDebug || false;
  const channel = authStore.channel;

  console.log(
    authStore.isLogin,
    "SessionUtility.GetItem(AuthAction.TOKEN)",
    SessionUtility.GetItem(AuthAction.TOKEN),
  );

  // const location = `${window.location.protocol}//${window.location.hostname}`;
  const location = useLocation();

  // unsed code commentted.

  const integration = useSelector((state) => state.integration);
  // // console.log("integration:::", integration);

  // const theme = useSelector((state) => state.clientPreference);
  const theme = {
    "primary-color": "#1A7AEB",
    "dark-primary-color": "#004DA5",
    "secondary-color": "#f2f2f2",
    "color-primary-50": "#E9F1FF",
    "color-primary-100": "#D3E4FE",
    "color-primary-200": "#ACCBFD",
    "color-primary-300": "#7DAFFC",
    "color-primary-400": "#4D96FB",
    "color-primary-500": "#1A7AEB",
    "color-primary-600": "#1263B6",
    "color-primary-700": "#0A4A84",
    "color-primary-800": "#05345B",
    "color-primary-900": "#021D34",
    "color-primary-950": "#011222",
  };

  useEffect(() => {
    if (!isNullObject(theme)) {
      console.log("theme changed:", theme);
      Object.keys(theme).forEach((key) => {
        if (theme[key]) {
          document.documentElement.style.setProperty(`--${key}`, theme[key]);
        }
      });
    }
  }, [theme]);

  console.log("location.search", location.search);

  useEffect(() => {
    window.addEventListener("load", setOnLineStatus);
    window.addEventListener("online", setOnLineStatus);
    window.addEventListener("offline", setOnLineStatus);
    return () => {
      window.addEventListener("load", setOnLineStatus);
      window.removeEventListener("online", setOnLineStatus);
      window.removeEventListener("offline", setOnLineStatus);
    };
  }, []);

  const setOnLineStatus = () => {
    if (!getOnLineStatus()) {
      dispatch(
        AlertAction.showAlert({
          heading: "You are currently offline",
          subHeading: "Please check your internet connection",
          type: "ERROR",
          retryButton: false,
          showError: true,
        }),
      );
    } else {
      dispatch(
        AlertAction.showAlert({
          showError: false,
        }),
      );
    }
  };

  const createRoute = (key, route) => {
    return (
      <Route key={key} path={route.path} element={route.component}>
        {/* CHILD ROUTES */}
        {route.children?.map((child, idx) => {
          // index redirect
          if (child.index && child.redirectTo) {
            return (
              <Route
                key={`index-${idx}`}
                index
                element={<Navigate to={child.redirectTo} replace />}
              />
            );
          }
          // normal child route
          return (
            <Route
              key={child.path}
              path={child.path}
              element={child.component}
            />
          );
        })}
      </Route>
    );
  };

  routes.map((route, index) => {
    console.log("Route:::::::", createRoute(index, route));
  });

  console.log("isLogin, location, channel", isLogin, location, channel);

  return (
    <Routes>
      {/* isLogin ===  */}
      {true ? (
        <>
          {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          <Route element={<AppLayout />}>
            {routes.map((route, index) => createRoute(index, route))}
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<EmailOtpVerification />} />
          <Route path="/setup-password" element={<SetupPassword />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoute;
