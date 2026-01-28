import React from "react";
import { useSelector } from "react-redux";
import "./wrapper.css";

export default function AppStatusBar() {
  const statusBar = useSelector((state) => state.statusBar);
  const items = statusBar.items || [];

  console.log("AppStatusBar", items);
  return Object.keys(items).length === 0 ? (
    <></>
  ) : (
    <div className=" fixed h-6 w-full bottom-0 bg-gray-50 shadow-inner border-1 border-orange-200 text-xs font-bold text-red-400 flex flex-row justify-end gap-3 ">
      {Object.keys(items).map((itemKey) => {
        return (
          <div className=" mt-1 w-fit font-lato animate-pulse loading">
            {items[itemKey]}
          </div>
        );
      })}
    </div>
  );
}
