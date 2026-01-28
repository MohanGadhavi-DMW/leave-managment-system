import React, { useState } from "react";
import CustomTabs from "@/components/CustomTabs";
import LeaveRequests from "./LeaveRequests";

function Leave() {
  const leaveTypes = [
    {
      label: "Leave Requests",
      value: "Leave_Requests",
      content: <LeaveRequests />,
    },
    {
      label: "Leave Summary  ",
      value: "Leave_Summary  ",
      content: "",
    },
  ];
  const [activeTab, setActiveTab] = useState("Leave_Requests");
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
