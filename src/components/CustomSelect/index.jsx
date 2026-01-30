import { isNullArray, isNullObject } from "@/utils/ObjectHelper";
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import React, { useState } from "react";
import AngleRightIcon from "@/assets/icons/angle-small-right.svg?react";

function CustomSelect({
  options = [],
  selected,
  setSelected = () => {},
  isMultiSelect = false,
  placeholder = "Select Option",
  menuLabel = "Select Option",
}) {
  const [open, setOpen] = useState(false);

  const toggleOption = (option) => {
    isMultiSelect
      ? setSelected((prev) =>
          prev.some((o) => o.value === option.value)
            ? prev.filter((o) => o.value !== option.value)
            : [...prev, option],
        )
      : setSelected(option);
  };
  const onSelectedAll = () => {
    if (selected.length === options.length) {
      setSelected([]);
    } else {
      setSelected([...options]);
    }
    return;
  };

  const label = isMultiSelect ? (
    isNullArray(selected) ? (
      <span className="text-gray-500 font-medium">{placeholder}</span>
    ) : selected.length === 1 ? (
      selected[0].label
    ) : (
      `${selected[0].label.substring(0, 6)}...+ ${selected.length - 1}`
    )
  ) : isNullObject(selected) ? (
    <span className="text-gray-500 font-medium">{placeholder}</span>
  ) : (
    selected.label
  );

  return (
    <Menu
      open={open}
      handler={setOpen}
      allowHover
      dismiss={{
        itemPress: !isMultiSelect,
      }}
    >
      <MenuHandler>
        <button
          className="min-w-[10em] min-h-[2.5em] flex items-center justify-between gap-2 px-3 py-2 text-sm
                     border border-gray-400 rounded-lg bg-white
                     hover:bg-gray-50 focus:outline-none text-gray-800 font-medium"
        >
          <span className="truncate">{label}</span>
          <AngleRightIcon className="w-4 h-4 rotate-90 fill-gray-400" />
        </button>
      </MenuHandler>

      <MenuList className="p-0">
        <div className="p-3 text-center border-b border-gray-300 text-sm font-medium text-gray-700">
          {menuLabel}
        </div>
        <div className="max-h-52 overflow-y-auto custom-scrollbar">
          {isMultiSelect && (
            <button
              onClick={onSelectedAll}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-100 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selected.length === options.length}
                className="h-4 w-4 rounded-sm border-gray-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-brand-primary">
                All
              </span>
            </button>
          )}
          {options.map((option, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-50 cursor-pointer group"
              onClick={() => toggleOption(option)}
            >
              {isMultiSelect && (
                <input
                  type="checkbox"
                  checked={selected.some((item) => item.value === option.value)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
                />
              )}
              <span className="text-sm text-gray-600 group-hover:text-brand-primary">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </MenuList>
    </Menu>
  );
}

export default CustomSelect;
