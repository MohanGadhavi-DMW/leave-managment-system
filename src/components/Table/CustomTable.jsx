import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function CustomTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full flex-1 flex flex-col rounded-xl">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-black bg-white hover:bg-gray-50">
            Casual Leaves
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-orange-400 bg-white hover:bg-gray-50">
            Pending
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full p-1.5 pl-9 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              placeholder="Ab..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            -
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length,
            )}{" "}
            Of {table.getFilteredRowModel().rows.length} filtered results
          </span>
          <div className="flex gap-1">
            <button
              className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-gray-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-4 border-b border-blue-gray-50"
                  >
                    <div className="font-normal text-sm text-gray-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
