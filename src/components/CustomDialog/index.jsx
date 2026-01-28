import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useState } from "react";
import CloseIcon from "@/assets/images/window-close.svg";

import { useSelector } from "react-redux";
import { toTitleCase } from "@/utils/ObjectHelper";

const CustomDialog = ({
  alertType = "INFO", // INFO, INPUT
  inputPlaceHolder = "",
  preSelectList = [],
  size = "xxl",
  className,
  bodyClassName,
  open,
  onClose,
  buttonList,
  icon,
  header,
  children,
  fullwidth,
  isModal = false,
  closeIcon = false,
  closeIconClass = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState({});
  const device = useSelector((state) => state.device);
  const isMobile = device.isMobile;

  const handleOnClick = (button, e) => {
    if ((button.validateInput ?? false) === false || alertType === "INFO") {
      if (button.onClick) button.onClick(e, inputValue);
      if (onClose) onClose();
    } else {
      const hasInput = !isNullorEmpty(inputValue);
      const isOptionSelected = Object.keys(selectedOption).length > 0;

      if (hasInput || isOptionSelected) {
        const value = hasInput ? inputValue : selectedOption.value ?? "";
        if (!isNullorEmpty(value)) {
          if (button.onClick) button.onClick(e, value);
          if (onClose) onClose();
        }
      }
    }
  };

  return (
    <Dialog
      open={open}
      size={size}
      className={
        (size === "xxl"
          ? " w-screen max-h-screen overflow-y-auto "
          : " w-full ") + `bg-white z-50 visible ${className}`
      }
      handler={() => {
        if (!isModal && onClose) onClose();
      }}
      animate={{
        mount: { scale: 1, X: 0, y: 0 },
        unmount: { scale: 1, X: 0, y: 0 },
      }}
    >
      {header && (
        <DialogHeader className={`px-3  ${fullwidth ? "w-full " : " "}`}>
          <div className="flex flex-row justify-between w-full">
            <div className="w-full ">{header}</div>
            {closeIcon && (
              <div onClick={onClose} className=" mr-8 mt-3 ">
                <CloseIcon
                  fill={"#000000"}
                  className={`absolute h-5 w-5 -mt-2 ml-0 mr-0 ${closeIconClass}`}
                />
              </div>
            )}
          </div>
        </DialogHeader>
      )}
      <DialogBody className={bodyClassName ? bodyClassName : ""}>
        <div className="p-0 md:p-0 flex flex-col justify-center items-center w-full text-center font-semibold ">
          {icon && <div className="w-18 h-18 ">{icon}</div>}
          <div
            className={`${
              isMobile || fullwidth ? " w-full " : " w-[65%] "
            } mt-4 text-lg`}
          >
            <div className="flex flex-col">
              {children}
              {alertType === "INPUT" && (
                <div className="flex flex-col w-full mt-3 py-2 gap-3 ">
                  {preSelectList && preSelectList.length > 0 && (
                    <div className="flex flex-col ">
                      <div className=" p-1 m-1 w-full border">
                        <Select
                          name={"options_list"}
                          selectedOption={selectedOption}
                          placeholder={"Select option"}
                          labelCustomClass="text-xs -mt-1"
                          btnCustomClass={" -mt-7 "}
                          helperCustomClass={" -mt-2 "}
                          options={preSelectList}
                          onSelectionChange={(selectedItem) => {
                            setInputValue("");
                            setSelectedOption(selectedItem);
                          }}
                        />
                      </div>
                      <div>Or</div>
                    </div>
                  )}
                  <div>
                    <input
                      value={inputValue}
                      maxLength={50}
                      className=" px-3 py-2 m-1 text-md w-full border border-[#e0e0e0] rounded-lg focus:border-primaryColor focus:outline-none"
                      placeholder={toTitleCase(inputPlaceHolder || "")}
                      onChange={(e) => {
                        setSelectedOption({});
                        setInputValue(e.target.value || "");
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogBody>
      {buttonList && (
        <DialogFooter>
          <div className="flex gap-3 flex-row justify-center items-center w-full pb-8 ">
            {buttonList.map((button) => (
              <>
                {button.type === "link" ? (
                  <div
                    className={
                      " text-base text-right font-bold text-blue flex-1 cursor-pointer mr-2 " +
                      button.color
                    }
                    onClick={(e) => handleOnClick(button, e)}
                  >
                    {button.label}
                  </div>
                ) : (
                  <div
                    className={`w-[calc(65%)] flex ${
                      button.align === "LEFT"
                        ? " justify-start "
                        : button.align === "RIGHT"
                        ? " justify-end "
                        : " justify-center "
                    } `}
                  >
                    <CustomButton
                      type={button.type}
                      variant={button.type === "button" ? "outlined" : "filled"}
                      fullWidth={true}
                      className={`capitalize ${button.className}`}
                      onClick={(e) => handleOnClick(button, e)}
                      label={button.label}
                      size={button.size}
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        </DialogFooter>
      )}
    </Dialog>
  );
};

export default CustomDialog;
