// import * as dayjs from "dayjs";
// import {
//   dayNames,
//   monthNames,
// } from "@/components/Form/DateSelect/dates.constant";

export const calculateAge = (dob, withDate) => {
  let modifiedDob = "";
  if (typeof dob === "string") {
    const [date, month, year] = dob.split("-").reverse();
    modifiedDob = `${month}/${date}/${year}`;
  }
  const wrt = new Date(withDate);
  const birthDate = new Date(modifiedDob || dob);
  let age = wrt.getFullYear() - birthDate.getFullYear();
  const m = wrt.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && wrt.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
};
// offset time  to get  local time
export const getDateInLocalTime = (dateObj) => {
  if (dateObj) {
    return new Date(
      dateObj.getTime() + Math.abs(dateObj.getTimezoneOffset() * 60000),
    );
  }
  return dateObj;
};
// default range if no  trip range to be selected
export const DEFAULT_DATE_RANGE = {
  min: new Date(),
  max: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
};

// export const getNumberOfDaysBetween = (startDate, endDate) => {
//   try {
//     let start = new Date(new Date(startDate).setHours(0, 0, 0, 0));
//     let end = new Date(new Date(endDate).setHours(0, 0, 0, 0));
//     start = dayjs(start);
//     end = dayjs(end);
//     const noOfDays = end.diff(start, "days");
//     return noOfDays;
//   } catch (e) {
//     return NaN;
//   }
// };

export const isDateFormatValid = (dateString) => {
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
    monthLength[1] = 29;
  return day > 0 && day <= monthLength[month - 1];
};
export const checkDob = (dateString) => {
  const dateList = dateString.split("/");
  if (dateList.length === 1) {
    return dateList[0].length <= 2;
  }
  if (dateList.length === 2) {
    return dateList[0].length <= 2 && dateList[1].length <= 2;
  }
  if (dateList.length === 3) {
    return (
      dateList[0].length <= 2 &&
      dateList[1].length <= 2 &&
      dateList[2].length <= 4
    );
  }
  return false;
};

export const getValidFormat = (dob) => {
  const [date, month, year] = dob.split("/");
  const modifiedDob = `${month}/${date}/${year}`;
  return getDateInLocalTime(new Date(modifiedDob));
};
export const convertToValidDateFormat = (date) =>
  new Date(new Date(date).setUTCHours(0, 0, 0, 0));

export const getStringFormat = (inputDate) => {
  if (typeof inputDate === "object") {
    const date = `00${inputDate.getDate()}`.slice(-2);
    const month = `00${inputDate.getMonth() + 1}`.slice(-2);
    const year = inputDate.getFullYear();
    return `${date}/${month}/${year}`;
  }
  return inputDate;
};

export const getDateDetails = (dateString) => {
  const date = new Date(dateString);
  // console.log(date);
  const dateObj = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    hourRange: date.getHours() > 11 ? "PM" : "AM",
    date: date.getDate(),
    month: date.toLocaleString("default", { month: "long" }),
  };
  return dateObj;
};

export const getTimeStamp = (dateString, prefix = "LAST SAVED -") => {
  const dateObj = getDateDetails(dateString);
  return `${prefix} ${dateObj.hours}: ${dateObj.minutes} ${dateObj.hourRange}, ${dateObj.month} ${dateObj.date}`;
};

export function formatTo12Hour(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12

  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutesStr} ${ampm}`;
}

// export const getDateFormatDayDateMonth = (dateObj) =>
//   `${dayNames[new Date(dateObj).getDay()]}, ${
//     monthNames[new Date(dateObj).getMonth()]
//   } ${new Date(dateObj).getDate()}`;
