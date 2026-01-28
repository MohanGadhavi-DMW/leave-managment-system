import React, { useState } from "react";
import CustomTabs from "@/components/CustomTabs";
import LeaveRequests from "./LeaveRequests";
import LeaveSummary from "./LeaveSummary";
import LeaveBalance from "./LeaveBalance";

function Leave() {
  const leaveTypes = [
    {
      label: "Leave Requests",
      value: "leave_requests",
      content: <LeaveRequests />,
    },
    {
      label: "Leave Summary  ",
      value: "leave_summary  ",
      content: <LeaveSummary />,
    },
    {
      label: "Leave Balance  ",
      value: "leave_balance  ",
      content: <LeaveBalance />,
    },
  ];
  const [activeTab, setActiveTab] = useState("leave_requests");
  return (
    <div className="w-full h-full">
      <CustomTabs
        tabList={leaveTypes}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export default Leave;
