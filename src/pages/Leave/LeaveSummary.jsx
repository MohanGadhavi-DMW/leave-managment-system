import React, { useState } from "react";
import ProfileIcon from "@/assets/images/Profile.svg";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AngleRightIcon from "@/assets/icons/angle-small-right.svg?react";
import NoDataIcon from "@/assets/icons/Nulldataicon.svg";
import CustomDialog from "@/components/CustomDialog";

const LeaveSummary = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [expandedType, setExpandedType] = useState(null);

    // Array-based data structure for employees and their leave stats
    const employeesLeaveData = [
        {
            id: 1,
            name: "Aarav M.",
            role: "Software Engineer",
            profilePic: ProfileIcon,
            lastLeave: "2 Days ago",
            leaveStats: [
                {
                    id: 1,
                    type: "Casual Leave",
                    used: 3, total: 12,
                    color: "bg-blue-500",
                    history: [
                        {
                            id: 201,
                            status: "Approved",
                            duration: "Mon Feb 12 (2025)",
                            reason: "I need to attend a personal family matter and will resume work the next day."
                        },
                        {
                            id: 202,
                            status: "Approved",
                            duration: "Fri Mar 08 (2025)",
                            reason: "Taking a casual leave due to personal errands that require my presence."
                        }
                    ]
                },
                {
                    id: 2,
                    type: "Sick Leave",
                    used: 2, total: 12,
                    color: "bg-pink-500",
                    history: [
                        {
                            id: 301,
                            status: "Approved",
                            duration: "Tue Jan 09 (2025)",
                            reason: "I am unwell due to viral fever and require rest as advised by the doctor."
                        },
                        {
                            id: 302,
                            status: "Approved",
                            duration: "Wed Apr 17 (2025)",
                            reason: "Experiencing severe migraine and unable to work effectively today."
                        }
                    ]

                },
                {
                    id: 3,
                    type: "Privilege Leave",
                    used: 4, total: 12,
                    color: "bg-green-500",
                    history: [
                        {
                            id: 401,
                            status: "Approved",
                            duration: "Mon May 06 (2025) - Fri May 10 (2025)",
                            reason: "Planning a family vacation and will ensure work handover before leaving."
                        },
                        {
                            id: 402,
                            status: "Approved",
                            duration: "Mon Dec 23 (2024) - Tue Dec 31 (2024)",
                            reason: "Applying for planned leave for year-end personal travel."
                        },
                        {
                            id: 403,
                            status: "Approved",
                            duration: "Mon Dec 23 (2024) - Tue Dec 31 (2024)",
                            reason: "Applying for planned leave for year-end personal travel."
                        },
                        {
                            id: 404,
                            status: "Approved",
                            duration: "Mon Dec 23 (2024) - Tue Dec 31 (2024)",
                            reason: "Applying for planned leave for year-end personal travel."
                        },

                    ]
                },
                {
                    id: 4,
                    type: "Marriage Leave",
                    used: 0, total: 12,
                    color: "bg-orange-300",
                    history: []
                },
                {
                    id: 5,
                    type: "Bereavement Leave",
                    used: 3, total: 12,
                    color: "bg-cyan-500",
                    history: [
                        {
                            id: 601,
                            status: "Approved",
                            duration: "Thu Aug 15 (2024) - Fri Aug 16 (2024)",
                            reason: "Taking bereavement leave due to the loss of a close family member."
                        }
                    ]
                },
            ],
        },
        {
            id: 2,
            name: "Aarav M.",
            role: "Software Engineer",
            profilePic: null,
            lastLeave: "2 Days ago",
            leaveStats: [
                { id: 1, type: "Casual Leave", used: 8, total: 12, color: "bg-blue-500", history: [] },
                { id: 2, type: "Sick Leave", used: 8, total: 12, color: "bg-pink-500", history: [] },
                { id: 3, type: "Privilege Leave", used: 8, total: 12, color: "bg-green-500", history: [] },
                {
                    id: 4, type: "Paternity Leave", used: 8, total: 12, color: "bg-purple-500", history: [
                        {
                            id: 701,
                            status: "Approved",
                            duration: "Mon Sep 02 (2025) - Fri Sep 13 (2025)",
                            reason: "Applying for paternity leave following the birth of my child."
                        }
                    ]
                },
            ],
        },
        // ... (other employees removed for brevity or kept if small)
        {
            id: 3,
            name: "Aarav M.",
            role: "Software Engineer",
            profilePic: null,
            lastLeave: "2 Days ago",
            leaveStats: [
                { id: 1, type: "Casual Leave", used: 8, total: 12, color: "bg-blue-500", history: [] },
                { id: 2, type: "Sick Leave", used: 8, total: 12, color: "bg-pink-500", history: [] },
                { id: 3, type: "Privilege Leave", used: 8, total: 12, color: "bg-green-500", history: [] },
                { id: 4, type: "Paternity Leave", used: 8, total: 12, color: "bg-purple-500", history: [] },
            ],
        },
    ];

    const handleViewDetails = (employee) => {
        setSelectedEmployee(employee);
        setOpenDialog(true);
        // Default expand "Sick Leave" for demo as per image
        setExpandedType(2);
    };

    const toggleExpand = (id) => {
        setExpandedType(expandedType === id ? null : id);
    };

    const leaveTypeThemes = {
        "Casual Leave": { text: "text-[#1A7AEB]", bg: "bg-[#1A7AEB]/20" },
        "Sick Leave": { text: "text-[#F01960]", bg: "bg-[#F01960]/20" },
        "Privilege Leave": { text: "text-[#02AA7F]", bg: "bg-[#02AA7F]/20" },
        "Marriage Leave": { text: "text-orange-500", bg: "bg-orange-50/20" },
        "Bereavement Leave": { text: "text-cyan-500", bg: "bg-cyan-50/20" },
        "Paternity Leave": { text: "text-purple-500", bg: "bg-purple-50/20" },
    };

    return (
        <div className="w-full flex-1 px-8 py-10 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employeesLeaveData.map((employee) => (
                    <div
                        key={employee.id}
                        className="bg-white w-[24rem] rounded-lg overflow-hidden border border-gray-100 shadow-sm"
                    >
                        {/* Header Section */}
                        <div className="p-5 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                                {employee.profilePic ? (
                                    <img
                                        src={employee.profilePic}
                                        alt={employee.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <UserCircleIcon className="w-10 h-10 text-gray-400" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                                    {employee.name}
                                </h3>
                                <p className="text-gray-500 text-sm font-medium">
                                    {employee.role}
                                </p>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="px-5 pb-5 space-y-3">
                            {employee.leaveStats.slice(0, 4).map((stat) => (
                                <div
                                    key={stat.id}
                                    className="flex items-center justify-between p-3 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                                        <span>{stat.type}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>{stat.used} / {stat.total}</span>
                                        <span>Days</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Section */}
                        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                                Last Leave: {employee.lastLeave}
                            </span>
                            <button
                                onClick={() => handleViewDetails(employee)}
                                className="text-brand-primary font-semibold text-sm hover:text-brand-primary/80 flex items-center gap-1"
                            >
                                View Details
                                <AngleRightIcon className="w-4 h-4 fill-brand-primary" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Leave Details Dialog */}
            {selectedEmployee && (
                <CustomDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    size="md"
                    className="rounded-3xl shadow-none"
                    fullwidth={true}
                    header={
                        <div className="flex items-center justify-between w-full px-4 py-2">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                                    {selectedEmployee.profilePic ? (
                                        <img src={selectedEmployee.profilePic} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <UserCircleIcon className="w-8 h-8 text-gray-400" />
                                    )}
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-800 leading-tight">{selectedEmployee.name}</h3>
                                    <p className="text-gray-500 text-xs font-medium">{selectedEmployee.role}</p>
                                </div>
                            </div>
                            <button onClick={() => setOpenDialog(false)} className="hover:bg-gray-100 p-1 rounded-full transition-colors">
                                <XMarkIcon className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                    }
                >
                    <div className="w-full px-2 max-h-[65vh] overflow-y-auto no-scrollbar pb-4">
                        <div className="space-y-4">
                            {selectedEmployee.leaveStats.map((stat) => {
                                const theme = leaveTypeThemes[stat.type] || { text: "text-gray-700", bg: "bg-gray-50/50" };
                                return (
                                    <div key={stat.id} className="w-full">
                                        <div
                                            onClick={() => toggleExpand(stat.id)}
                                            className={`flex items-center justify-between py-2 px-5 rounded-lg border border-gray-300 cursor-pointer transition-all`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                                                <span className="font-bold text-gray-700">{stat.type}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`${expandedType === stat.id ? `${theme.bg} ${theme.text}` : "text-gray-700"} font-bold px-2 rounded`}>
                                                        {stat.used} / {stat.total}
                                                    </span>
                                                    <span className="text-gray-700 text-sm font-medium">Days</span>
                                                </div>
                                                <AngleRightIcon className={`w-4 h-4 transition-transform ${expandedType === stat.id ? "rotate-90 fill-gray-800" : "fill-gray-700"}`} />
                                            </div>
                                        </div>

                                        {/* Expanded History */}
                                        {expandedType === stat.id && (
                                            <div className="mt-[-1rem] pt-8 p-6 rounded-b-2xl border-x border-b border-gray-300 bg-white space-y-4 shadow-sm max-h-[350px] overflow-y-auto no-scrollbar">
                                                {stat.history && stat.history.length > 0 ? (
                                                    stat.history.map((entry, idx) => (
                                                        <div key={idx} className={`space-y-3 ${idx !== stat.history.length - 1 ? "border-b border-gray-300 pb-5" : ""}`}>
                                                            <div className="flex justify-between items-start">
                                                                <div className="flex gap-2">
                                                                    <span className="text-gray-700 font-semibold text-sm">Duration:</span>
                                                                    <span className="text-gray-600 text-sm">{entry.duration}</span>
                                                                </div>
                                                                <span className="text-green-500 font-semibold text-sm">{entry.status}</span>
                                                            </div>
                                                            {entry.reason && (
                                                                <div className="flex gap-2 text-left">
                                                                    <span className="text-gray-700 font-semibold text-sm flex-shrink-0">Reason:</span>
                                                                    <p className="text-gray-600 text-sm leading-relaxed">{entry.reason}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center py-4 text-gray-400 text-sm flex flex-col items-center gap-3">
                                                        <img src={NoDataIcon} alt="" className="w-16 h-16" />
                                                        No history found for this leave type.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </CustomDialog>
            )}
        </div>
    );
};

export default LeaveSummary;
