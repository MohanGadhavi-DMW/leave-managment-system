import { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { routes } from "@/routes";
import ProfileAction from "@/store/Profile/ProfileAction";
import AuthAction from "@/store/Auth/AuthAction";
import SessionUtility from "@/constant/SessionUtility";
import { isNullObject } from "@/utils/ObjectHelper";
import CustomDialog from "@/Components/CustomDialog"; // Ensure this path is correct
import LogoutIcon from "@/assets/icons/exit.svg"; // Adjust path if needed

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileStore = useSelector((state) => state.profile);

  console.log(
    "profileStore.userPref?.activeMenu",
    profileStore.userPref?.activeMenu,
  );

  const activeMenu = isNullObject(profileStore.userPref?.activeMenu)
    ? "HOME"
    : profileStore.userPref?.activeMenu;

  const [collapsed, setCollapsed] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = async () => {
    // 1️⃣ Reset redux state
    await dispatch(ProfileAction.setActiveMenu("HOME"));
    await dispatch(AuthAction.logout());

    // 2️⃣ Clear session storage
    SessionUtility.RemoveItem(ProfileAction.STORAGE_ACTIVE_MENU);
    SessionUtility.RemoveItem(AuthAction.TOKEN);

    setLogoutDialogOpen(false);
    navigate("/login");
  };

  /* =========================
   SIDEBAR ITEM
========================= */
  const SidebarItem = ({ icon: Icon, label, skey, to }) => {
    return (
      <NavLink
        to={to}
        onClick={async () => {
          console.log("handleClick", skey);
          if (skey === "LOGOUT") {
            setLogoutDialogOpen(true);
            return;
          }
          await dispatch(ProfileAction.setActiveMenu(skey));
          // navigate(to);
        }}
        // title={collapsed ? label : ""}
        className={"w-full px-2 flex flex-col items-center  text-center group"}
        // ${collapsed ? "w-12 justify-center" : "w-full gap-3 "}
      >
        {({ isActive: activeMenu }) => (
          <>
            <div
              className={` h-10 w-10 cursor-pointer flex items-center justify-center gap-0.5 transition-all duration-200 rounded-lg
        ${
          activeMenu
            ? "bg-[#0161CD] text-white"
            : "text-[#31353B] hover:bg-white/10"
        }
        `}
            >
              <Icon className="w-5 h-5 shrink-0 fill-white" />
            </div>

            <span className={` ${activeMenu ? " font-bold " : ""}`}>
              {label}
            </span>
          </>
        )}
      </NavLink>
    );
  };

  return (
    <>
      <div
        className={`bg-brand-dark-primary py-4 transition-all duration-300 w-[4rem]
          `}
        // ${collapsed ? "w-20" : "w-56 px-3"}
      >
        {/* TOGGLE */}
        {/* <div className="flex justify-end py-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRightIcon className="h-5 w-5" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" />
            )}
          </button>
        </div> */}

        {/* MENU */}
        <div
          className={`px-2 flex flex-col items-center gap-4 text-white text-xs`}
        >
          {routes.map((route) => {
            console.log("route.key", route);

            if (route.isMenu) {
              return (
                <SidebarItem
                  key={route.key}
                  icon={route.icon}
                  label={route.label}
                  skey={route.key}
                  to={route.path}
                />
              );
            }
          })}
        </div>
      </div>

      <CustomDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        size="sm"
        header={null}
        isModal={true}
        bodyClassName="!p-6"
      >
        <div className="flex flex-col items-center text-center">
          <img src={LogoutIcon} className="w-8 h-8 mb-4" alt="Logout" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Out</h3>
          <p className="text-gray-500 text-sm mb-6">
            Signing out will end your session.
            <br />
            Are you sure you want to sign out
          </p>
          <div className="flex items-center justify-center gap-3 w-full mb-8">
            <button
              onClick={handleLogout}
              className=" primary-btn !py-1.5 !focus:outline-none !focus:ring-0  !focus:border-brand-primary !focus:ring-brand-primary "
            >
              Sign out
            </button>
            <button
              onClick={() => setLogoutDialogOpen(false)}
              className="outlined-btn  !py-1.5"
            >
              Cancel
            </button>
          </div>
        </div>
      </CustomDialog>
    </>
  );
};

export default Sidebar;
