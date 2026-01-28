import CustomTable from "@/components/Table/CustomTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import InfoIcon from "@/assets/icons/infoicon.svg?react";

const columnHelper = createColumnHelper();

const mockData = [
  {
    id: 1,
    employee: {
      name: "Aarav M.",
      role: "Software Engineer",
      image: "https://i.pravatar.cc/150?u=1",
    },
    type: "Casual Leave (Paid)",
    from: "Oct 24 (2024)",
    to: "Jan 25 (2025)",
    duration: 3,
    status: "Pending",
  },
  {
    id: 2,
    employee: {
      name: "Priya S.",
      role: "Frontend Dev.",
      image: "https://i.pravatar.cc/150?u=2",
    },
    type: "Casual Leave (Paid)",
    from: "Oct 24 (2024)",
    to: "Jan 25 (2025)",
    duration: 4,
    status: "Pending",
  },
  {
    id: 3,
    employee: {
      name: "Aarav M.",
      role: "Backend Dev.",
      image: "https://i.pravatar.cc/150?u=3",
    },
    type: "Casual Leave (Paid)",
    from: "Oct 24 (2024)",
    to: "Jan 25 (2025)",
    duration: 1,
    status: "Pending",
  },
  {
    id: 4,
    employee: {
      name: "Priya S.",
      role: "Frontend Dev.",
      image: "https://i.pravatar.cc/150?u=4",
    },
    type: "Casual Leave (Paid)",
    from: "Oct 24 (2024)",
    to: "Jan 25 (2025)",
    duration: 7,
    status: "Pending",
  },
  {
    id: 5,
    employee: {
      name: "Aarav M.",
      role: "Software Engineer",
      image: "https://i.pravatar.cc/150?u=5",
    },
    type: "Casual Leave (Paid)",
    from: "Oct 24 (2024)",
    to: "Jan 25 (2025)",
    duration: 6,
    status: "Pending",
  },
  {
    id: 6,
    employee: {
      name: "Priya S.",
      role: "Frontend Dev.",
      image: "https://i.pravatar.cc/150?u=6",
    },
    type: "Casual Leave (Paid)",
    from: "Oct 24 (2024)",
    to: "Jan 25 (2025)",
    duration: 3,
    status: "Pending",
  },
  {
    id: 7,
    employee: {
      name: "Aarav M.",
      role: "Backend Dev.",
      image: "https://i.pravatar.cc/150?u=7",
    },
    type: "Casual Leave (Paid)",
    from: "Oct 24 (2024)",
    to: "Jan 25 (2025)",
    duration: 4,
    status: "Pending",
  },
  {
    id: 8,
    employee: {
      name: "Priya S.",
      role: "Frontend Dev.",
      image: "https://i.pravatar.cc/150?u=8",
    },
    type: "Casual Leave (Paid)",
    from: "Oct 24 (2024)",
    to: "Jan 25 (2025)",
    duration: 1,
    status: "Pending",
  },
  {
    id: 9,
    employee: {
      name: "Aarav M.",
      role: "Backend Dev.",
      image: "https://i.pravatar.cc/150?u=7",
    },
    type: "Casual Leave (Paid)",
    from: "Oct 24 (2024)",
    to: "Jan 25 (2025)",
    duration: 4,
    status: "Pending",
  },
  {
    id: 10,
    employee: {
      name: "Priya S.",
      role: "Frontend Dev.",
      image: "https://i.pravatar.cc/150?u=8",
    },
    type: "Casual Leave (Paid)",
    from: "Oct 24 (2024)",
    to: "Jan 25 (2025)",
    duration: 1,
    status: "Pending",
  },
  {
    id: 11,
    employee: {
      name: "Aarav M.",
      role: "Backend Dev.",
      image: "https://i.pravatar.cc/150?u=7",
    },
    type: "Casual Leave (Paid)",
    from: "Oct 24 (2024)",
    to: "Jan 25 (2025)",
    duration: 4,
    status: "Pending",
  },
];

const columns = [
  columnHelper.accessor("employee", {
    header: "Employee",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <img
          src={info.getValue().image}
          alt={info.getValue().name}
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-900">
            {info.getValue().name}
          </p>
          <p className="text-xs text-gray-500">{info.getValue().role}</p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("type", {
    header: "Type",
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
  columnHelper.accessor("status", {
    header: "Status",
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

function LeaveRequests() {
  const data = useMemo(() => mockData, []);

  return (
    <div className="w-full flex-1 px-8 py-10 overflow-y-auto">
      {/* Filter applied   and Action Nedded  */}
      <div className="flex justify-between items-stretch gap-5">
        <div className="w-[60%] flex flex-col gap-1 bg-brand-100 p-4 rounded-lg">
          <p className="text-sm font-semibold text-black">
            Filters applied successfully:{" "}
          </p>
          <p className="text-[0.8em] text-gray-800">
            Designation- Software engineering / Branch- Powai / City- Mumbai /
            State-Maharashtra / Current Period: Jan 2024 - Jan 2025
          </p>
        </div>
        <div className="w-[40%] flex items-end gap-2 justify-end pb-1 text-gray-800 text-[0.8em]">
          <InfoIcon className="w-4 h-4 mb-[3px]" />
          <span>Action needed : Check Status 12 Leave Requests Pending</span>
        </div>
      </div>

      <div className="w-full h-full mt-6 bg-white rounded-xl">
        <CustomTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default LeaveRequests;
