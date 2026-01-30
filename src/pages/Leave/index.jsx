import React, { useEffect, useMemo, useState } from "react";
import CustomTabs from "@/components/CustomTabs";
import TeamLeaveRequests from "./TeamLeaveRequests";
import TeamLeaveSummary from "./TeamLeaveSummary";
import PersonalLeaveBalance from "./PersonalLeaveBalance";
import { useSelector } from "react-redux";
import { isNullArray } from "@/utils/ObjectHelper";
import PersonalLeaveSummary from "./PersonalLeaveSummary";

function Leave() {
  const [selectedTab, setSelectedTab] = useState(null);
  const selectedCategory = useSelector(
    (state) => state.profile?.userPref?.activeCategory,
  );

  const leaveTypes = useMemo(() => {
    setSelectedTab(null);
    if (selectedCategory?.value === "team") {
      return [
        {
          label: "Leave Requests",
          value: "team_leave_requests",
          content: <TeamLeaveRequests />,
        },
        {
          label: "Leave Summary",
          value: "team_leave_summary",
          content: <TeamLeaveSummary />,
        },
      ];
    } else if (selectedCategory?.value === "myself") {
      return [
        {
          label: "Leave Summary",
          value: "personal_leave_summary",
          content: <PersonalLeaveSummary />,
        },
        {
          label: "Leave Balance",
          value: "personal_leave_balance",
          content: <PersonalLeaveBalance />,
        },
      ];
    } else if (selectedCategory?.value === "policies") {
      return [];
    }
    return [];
  }, [selectedCategory?.value]);

  // Derive the effective active tab synchronously
  const activeTab = useMemo(() => {
    if (isNullArray(leaveTypes)) return null;

    // If user has explicitly selected a tab, use it IF it exists in current list
    if (selectedTab) {
      const exists = leaveTypes.find((tab) => tab.value === selectedTab.value);
      if (exists) return selectedTab;
    }

    // Default to first tab
    return leaveTypes[0];
  }, [leaveTypes, selectedTab, selectedCategory]);

  if (isNullArray(leaveTypes)) {
    return null;
  }

  return (
    <div className="w-full h-full">
      <CustomTabs
        key={`${selectedCategory?.value}-${leaveTypes.length}`}
        tabList={leaveTypes}
        activeTab={activeTab}
        setActiveTab={setSelectedTab}
      />
    </div>
  );
}

export default Leave;
