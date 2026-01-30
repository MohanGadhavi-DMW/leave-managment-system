import React from "react";
import InfoIcon from "@/assets/icons/infoicon.svg?react";
import BulbIcon from "@/assets/icons/bulb.svg?react";
import PlaneIcon from "@/assets/icons/Airoplane.svg?react";
import { Tooltip, Typography } from "@material-tailwind/react";

const PersonalLeaveBalance = () => {
  const leaveBalances = [
    {
      id: 1,
      type: "CASUAL",
      total: 25,
      remaining: 18.5,
      accrualType: "2.05 Days a month",
      carryForward: "5 days",
      color: "text-blue-500",
      dotColor: "bg-blue-500",
    },
    {
      id: 2,
      type: "SICK",
      total: 25,
      remaining: 18.5,
      accrualType: "2.05 Days a month",
      carryForward: "No carry over",
      color: "text-red-500",
      dotColor: "bg-red-500",
    },
    {
      id: 3,
      type: "PRIVILEGED",
      total: 25,
      remaining: 18.5,
      accrualType: "2.05 Days a month",
      carryForward: "2 Days",
      color: "text-green-500",
      dotColor: "bg-green-500",
      balanceColor: "text-orange-400",
      alert: {
        text: "Low balance remaining",
        type: "warning",
      },
    },
    {
      id: 4,
      type: "STUDY",
      total: 25,
      remaining: 18.5,
      accrualType: "2.05 Days a month",
      carryForward: "10 days",
      color: "text-purple-500",
      dotColor: "bg-purple-500",
      alert: {
        text: "Limit reached. Accrues next cycle",
        type: "error",
      },
    },
  ];

  return (
    <div className="w-full flex-1 px-8 py-10 overflow-y-auto">
      {/* Grid for Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 select-none">
        {leaveBalances.map((item) => (
          <div
            key={item.id}
            className={`${
              item.type === "PRIVILEGED" ? "bg-[#FFF5ED]" : "bg-white"
            } ${
              item.type === "STUDY" ? "bg-[#F3F4F5]" : "bg-white"
            } rounded-xl p-6 flex flex-col relative`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                <span className="text-xs font-bold text-black tracking-wider">
                  {item.type}
                </span>
              </div>
              <Tooltip
                content="View Policy"
                placement="bottom"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 0 },
                }}
                className="bg-white text-gray-800 px-4 py-1.5 shadow-xl border border-gray-100 rounded-full font-medium text-xs"
              >
                <div className="cursor-pointer">
                  <InfoIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                </div>
              </Tooltip>
            </div>

            {/* Balance */}
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-4xl font-bold  ${
                    item.type === "PRIVILEGED" ? "text-[#F6A500]" : ""
                  }  ${item.type === "STUDY" ? "text-[#7E8795]" : ""}`}
                >
                  {item.remaining}
                </span>
                <span
                  className={`text-sm font-medium ${
                    item.type === "PRIVILEGED" ? "text-[#F6A500]" : ""
                  }  ${item.type === "STUDY" ? "text-[#7E8795]" : ""}`}
                >
                  / Of {item.total} Days
                </span>
              </div>
              <p className={`text-base text-black font-medium mt-1 `}>
                Remaining
              </p>
            </div>

            {/* Details */}
            <div div className="space-y-3 pt-4 flex-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700 font-semibold tracking-wide">
                  Accrual
                </span>
                <span className="text-gray-900 font-semibold">
                  {item.accrualType}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700 font-semibold tracking-wide">
                  Carry Forward
                </span>
                <span className="text-gray-900 font-semibold">
                  {item.carryForward}
                </span>
              </div>

              {/* Alerts */}
              {item.alert && (
                <div
                  className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                    item.alert.type === "warning"
                      ? "bg-[#FFDCBF] text-black"
                      : "bg-[#FEDADF] text-black"
                  }`}
                >
                  {item.alert.type === "warning" ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                  )}
                  <span className="text-sm font-semibold">
                    {item.alert.text}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pro-tip Section */}
      <div className="bg-white rounded-2xl border border-gray-100 py-6 px-6 mb-6 flex gap-6 items-start justify-center shadow-sm max-w-4xl">
        <div className="w-12 h-12 bg-blue-50/50 rounded-lg flex items-center justify-center flex-shrink-0">
          <BulbIcon className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h4 className="text-black font-bold mb-1">
            Pro-tip for balance management
          </h4>
          <p className="text-[#7E8795] text-base leading-relaxed">
            Unused Annual Leave Balance (up to 5 days) will automatically carry
            forward to the 2025 period on January 1st. Sick and Personal leave
            do not carry over
          </p>
        </div>
      </div>

      {/* Upcoming Leave Section */}
      <div className="bg-[#ACCBFD]/30 rounded-2xl border border-blue-100/50 p-6 flex gap-6 items-center shadow-sm max-w-6xl">
        <div className="w-12 h-12 bg-blue-100/50 rounded-lg flex items-center justify-center flex-shrink-0">
          <PlaneIcon className="w-6 h-6 text-blue-500 fill-blue-500" />
        </div>
        <div>
          <h4 className="text-[#0A4A84] font-bold mb-1 uppercase tracking-wider text-sm">
            Upcoming Leave
          </h4>
          <p className="text-[#7E8795] text-sm font-medium">
            Your winter break (5 days) starts on 20th Sep 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalLeaveBalance;
