import HomeIcon from "@/assets/icons/house-blank.svg?react";
import UmbrellaIcon from "@/assets/icons/umbrella-beach.svg?react";
import AdminIcon from "@/assets/icons/admin-alt.svg?react";
import SettingIcon from "@/assets/icons/settings.svg?react";
import interrogationIcon from "@/assets/icons/interrogation.svg?react";
import LogoutIcon from "@/assets/icons/exit.svg?react";
import DashboardPage from "./pages/Dashboard";
import LeavePage from "./pages/Leave";

const Dashboard = {
  label: "Home",
  path: "/dashboard",
  key: "HOME",
  icon: HomeIcon,
  component: <DashboardPage />,
  isMenu: true,
};

const Leave = {
  label: "Leave",
  path: "/leave",
  key: "LEAVE",
  icon: UmbrellaIcon,
  component: <LeavePage />,
  isMenu: true,
};
const Admin = {
  label: "Admin",
  path: "/admin",
  key: "ADMIN",
  icon: AdminIcon,
  component: <></>,
  isMenu: true,
};

// const CandidateApplyJob = {
//   label: "Apply jobs",
//   path: "/applied-jobs",
//   key: MENU_LIST.CANDIDATE_JOB_APPLY,
//   icon: DocumentIcon,
//   component: (
//     <>
//       <Outlet />
//     </>
//   ),
//   isMenu: true,
//   children: [
//     {
//       index: true,
//       redirectTo: "scheduled-interviews",
//     },
//     {
//       path: "scheduled-interviews",
//       component: <ScheduledInterviews />,
//     },
//     {
//       path: "interview-history",
//       component: <InterviewHistoryPage />,
//     },
//   ],
// };

const Setting = {
  label: "Setting",
  path: "/settings",
  key: "SETTINGS",
  icon: SettingIcon,
  component: <></>,
  isMenu: true,
};

const HelpCenterAndSupport = {
  label: "Help & Support",
  path: "/help-center",
  key: "HELPCENTERANDSUPPORT`",
  icon: interrogationIcon,
  component: <></>,
  isMenu: true,
};

const Logout = {
  label: "Logout",
  path: "/logout",
  key: "LOGOUT",
  icon: LogoutIcon,
  component: <></>,
  isMenu: true,
};

// const CandidateProfile = {
//   label: "Candidate Profile",
//   path: "/edit-profile",
//   key: MENU_LIST.CANDIDATE_PROFILE,
//   icon: null,
//   component: <EditProfileLayout />,
//   children: [
//     {
//       index: true,
//       redirectTo: "basic",
//     },
//     {
//       path: "basic",
//       component: <EditProfileForm />,
//     },
//     {
//       path: "skills",
//       component: <AddSkillsForm />,
//     },
//     {
//       path: "experience",
//       component: <ExperienceContainer />,
//     },
//     {
//       path: "education",
//       component: <EducationSection />,
//     },
//   ],
// };

export const routes = [
  Dashboard,
  Leave,
  Setting,
  Admin,
  HelpCenterAndSupport,
  Logout,
];
