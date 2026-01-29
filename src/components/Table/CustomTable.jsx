import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import AngleRightIcon from "@/assets/icons/angle-small-right.svg?react";

export default function CustomTable({
  columns,
  data,
  filters = <></>,
  isSorting = false,
}) {
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
    <div className="w-full flex-1 flex flex-col text-black">
      {/* filters & pagination */}
      <div className="p-4 border-b border-gray-300 flex items-center justify-between gap-4 flex-wrap">
        {/* filters */}
        <div className="flex items-center gap-4">{filters}</div>

        {/* pagination */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-black">
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
              className="p-1.5 border border-gray-300 rounded-lg fill-gray-600 enabled:hover:bg-brand-50 enabled:hover:fill-brand-primary disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <AngleRightIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              className="p-1.5 border border-gray-300 rounded-lg fill-gray-600 enabled:hover:bg-brand-50 enabled:hover:fill-brand-primary disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <AngleRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* table */}
      <table className="w-full min-w-max table-auto text-left overflow-x-auto">
        <thead className="bg-gray-500/20 border-b border-gray-300">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`${
                    isSorting ? "cursor-pointer hover:bg-blue-gray-50" : ""
                  }  p-4 transition-colors`}
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
                <td key={cell.id} className="p-4 border-b border-blue-gray-50">
                  <div className="font-normal text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
