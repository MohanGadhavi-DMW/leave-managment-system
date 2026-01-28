import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import DeviceDetectAction from "@/store/DeviceDetect/DeviceDetectAction";
import AlertAction from "@/store/Alert/AlertAction";
import CustomDialog from "@/Components/CustomDialog";
import AppStatusBar from "./AppStatusBar";

const AppLayout = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const alert = useSelector((state) => state.alert);

  const isMobilePotrait = useMediaQuery({ maxWidth: 775 });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  useEffect(() => {
    dispatch(DeviceDetectAction.isMobile(isMobilePotrait));
  }, [isMobilePotrait, isPortrait]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setOpen(alert?.length > 0);
  }, [alert]);

  const closeDialog = () => {
    dispatch(AlertAction.clearAlert());
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col">
        {/* COMMON NAVBAR */}
        <Navbar />

        {/* COMMON BODY */}
        <div className="flex flex-1 pt-16 overflow-hidden">
          {/* COMMON SIDEBAR */}
          <Sidebar />

          {/* PAGE CONTENT */}
          <div className="flex-1  overflow-y-auto">
            <Outlet />
          </div>
        </div>
        <CustomDialog {...alert} open={open} onClose={() => closeDialog()} />
      </div>
      <AppStatusBar />
    </>
  );
};

export default AppLayout;
