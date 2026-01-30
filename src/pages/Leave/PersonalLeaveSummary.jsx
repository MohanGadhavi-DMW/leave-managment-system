import React, { useMemo, useState } from "react";
import ProfileIcon from "@/assets/images/Profile.svg";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AngleRightIcon from "@/assets/icons/angle-small-right.svg?react";
import NoDataIcon from "@/assets/icons/Nulldataicon.svg";
import CustomDialog from "@/components/CustomDialog";
import CustomTable from "@/components/Table/CustomTable";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("reason", {
    header: "Reason",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("from", {
    header: "From",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("to", {
    header: "To",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("duration", {
    header: "Duration",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("approvals", {
    header: "Approvals",
    cell: (info) => (
      <span className="text-orange-400 font-medium">{info.getValue()}</span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: () => (
      <button className="text-blue-500 font-medium hover:text-blue-700">
        View
      </button>
    ),
  }),
];

const mockData = [
  {
    id: 1,
    type: "Casual Leave (Paid)",
    reason: "Rest Recovery",
    from: "Oct 24 (2024)",
    to: "Oct 24 (2024)",
    duration: 3,
    approvals: "Pending",
  },
  {
    id: 2,
    type: "Privileged Leave (Unpaid)",
    reason: "Travel Plan",
    from: "Oct 24 (2024)",
    to: "Oct 24 (2024)",
    duration: 4,
    approvals: "Pending",
  },
  {
    id: 3,
    type: "Sick Leave (Unpaid)",
    reason: "Rest Recovery",
    from: "Oct 24 (2024)",
    to: "Oct 24 (2024)",
    duration: 1,
    approvals: "Approved",
  },
  {
    id: 4,
    type: "Marriage Leave (Paid)",
    reason: "Travel Plan",
    from: "Oct 24 (2024)",
    to: "Oct 24 (2024)",
    duration: 7,
    approvals: "Pending",
  },
  {
    id: 5,
    type: "Casual Leave (Paid)",
    reason: "Rest Recovery",
    from: "Oct 24 (2024)",
    to: "Oct 24 (2024)",
    duration: 6,
    approvals: "Pending",
  },
];

const leaveSummaryData = [
  {
    id: 1,
    title: "Casual Leave",
    count: 12,
    used: 12,
    total: 24,
    accentColor: "#ACCBFD", // Blue
  },
  {
    id: 2,
    title: "Paternity Leaves",
    count: 12,
    used: 12,
    total: 24,
    accentColor: "#4C0D8C33", // Purple
  },
  {
    id: 3,
    title: "Earned Leaves",
    count: 12,
    used: 12,
    total: 24,
    accentColor: "#AAFFDC", // Green
  },
  {
    id: 4,
    title: "Sick Leaves",
    count: 12,
    used: 12,
    total: 24,
    accentColor: "#FDB7C1", // Pink
  },
];

const PersonalLeaveSummary = () => {
  const data = useMemo(() => mockData, []);

  return (
    <div className="w-full flex-1 px-8 py-10 overflow-y-auto">
      {/* leave cards */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center ">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {leaveSummaryData.map((leave) => (
            <div
              key={leave.id}
              className="bg-white text-gray-900 rounded-xl p-5 flex flex-col justify-between h-[8em] w-full min-w-[200px]"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg`}
                  style={{ backgroundColor: leave.accentColor }}
                ></div>
                <div>
                  <span className="font-medium text-base">{leave.title}</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold ">{leave.count}</span>
                    <span className="text-xs text-gray-500 font-medium">
                      Days available
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-2">
                <p className="text-xs text-gray-600 flex items-center gap-0.5 font-medium">
                  Used:
                  <span className="text-black">{leave.used}</span>
                  <span className="text-black text-[10px] px-1"> • </span>{" "}
                  Total:
                  <span className="text-black">{leave.total}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="min-w-[150px] inline w-fit text-left pl-5 text-blue-500 text-sm font-medium hover:underline whitespace-nowrap">
          View All
        </button>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg border border-gray-300">
        <CustomTable columns={columns} data={data} title="Leaves Requests" />
      </div>
    </div>
  );
};

export default PersonalLeaveSummary;
