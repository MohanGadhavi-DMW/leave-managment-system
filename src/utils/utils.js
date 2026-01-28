import { isOnClient } from ".";
import { isNullorEmpty } from "./ObjectHelper";
// CALENDAR UTILITY FUNCTIONS
export const getToken = () => {
  return sessionStorage.getItem("token");
};

export const getSearchId = () => {
  return sessionStorage.getItem("searchId");
};

export const getXQ2TRequestId = () => {
  if (isOnClient) {
    const uuidToken = sessionStorage.getItem("x-request-id");
    const version = "1"; // TODO add version changes
    return `${version}-${Date.now().toString(16)}-${uuidToken}`;
  }
};

export function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    const context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export const capitalize = (str) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
};

export const randomDayData = () => {
  const min = 10000;
  const max = 15000;
  const randomNum = Math.floor(Math.random() * (max - min + 1) + min);

  return {
    price: `₹${randomNum}`,
    class: randomNum <= 12000 ? "greenText" : "redText",
    isSoldOut: randomNum > 12000 && randomNum < 13000,
    availableOnPreviousDate: randomNum >= 13000 && randomNum <= 13500,
  };
};

export const dayAdditionalData = new Array(31)
  .fill(0)
  .map(() => randomDayData());

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const SHORT_WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thurs",
  "Fri",
  "Sat",
];

export const LONG_WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const anyDateCreator = (afterDays, dateObj) => {
  if (dateObj) {
    const newDateObj = new Date(dateObj.getTime());
    return new Date(newDateObj.setDate(newDateObj.getDate() + afterDays));
  }

  return new Date(new Date().setDate(new Date().getDate() + afterDays));
};

// WILL RETURN ARRAY CONTAINING [dd, mmm, yy, dy]
export const dateArrGenerator = (dateObj) => {
  return dateObj
    ? [
        dateObj.getDate(),
        MONTHS[dateObj.getMonth()],
        dateObj.getFullYear().toString().slice(-2),
        LONG_WEEK_DAYS[dateObj.getDay()],
      ]
    : [
        new Date().getDate(),
        MONTHS[new Date().getMonth()],
        new Date().getFullYear().toString().slice(-2),
        LONG_WEEK_DAYS[new Date().getDay()],
      ];
};

// FOR LANDING PAGE LABEL DISPLAY
export const landingDateFormatter = (dateObj) => {
  return dateObj
    ? `${dateObj.getDate()} <span class='latoRegular font18 lineHeight10'>${
        MONTHS[dateObj.getMonth()]
      } '${dateObj.getFullYear().toString().slice(-2)}</span>`
    : `${new Date().getDate()} <span class='latoRegular font18 lineHeight10'>${
        MONTHS[new Date().getMonth()]
      } '${new Date().getFullYear().toString().slice(-2)}</span>`;
};

// FOR MODIFY SEARCH LABEL DISPLAY
export const modifyDateFormatter = (dateObj) => {
  return dateObj
    ? `${SHORT_WEEK_DAYS[dateObj.getDay()]},${dateObj.getDate()} ${
        MONTHS[dateObj.getMonth()]
      } ${dateObj.getFullYear().toString().slice(-2)}`
    : `${SHORT_WEEK_DAYS[new Date().getDay()]},${new Date().getDate()} ${
        MONTHS[new Date().getMonth()]
      } ${new Date().getFullYear().toString().slice(-2)}`;
};

export const mfActiveTypeMatch = {
  0: "One Way",
  1: "Round Trip",
  2: "Multi Trip",
};

// FOR DISPAYING INSIDE THE CALENDAR
export const calendarLabelFormatter = (dateObj) => {
  return dateObj
    ? `${dateObj.getDate()} ${MONTHS[dateObj.getMonth()]}' ${dateObj
        .getFullYear()
        .toString()
        .slice(-2)}`
    : `${new Date().getDate()} ${MONTHS[new Date().getMonth()]}' ${new Date()
        .getFullYear()
        .toString()
        .slice(-2)}`;
};

// RANDOM-ID GENERATOR FUNCTION
export const makeID = (length) => {
  var result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

// BG SVG GENERATOR
const REGEX = {
  whitespace: /\s+/g,
  urlHexPairs: /%[\dA-F]{2}/g,
  quotes: /"/g,
};

function collapseWhitespace(str) {
  return str.trim().replace(REGEX.whitespace, " ");
}

function dataURIPayload(string) {
  return encodeURIComponent(string).replace(
    REGEX.urlHexPairs,
    specialHexEncode
  );
}

function specialHexEncode(match) {
  switch (
    match // Browsers tolerate these characters, and they're frequent
  ) {
    case "%20":
      return " ";
    case "%3D":
      return "=";
    case "%3A":
      return ":";
    case "%2F":
      return "/";
    default:
      return match.toLowerCase(); // compresses better
  }
}

// Taken from https://github.com/tigt/mini-svg-data-uri to compress svg generated to show dashes fo number of stories
export const svgToDataUri = (svgString) => {
  if (typeof svgString !== "string") {
    throw new TypeError("Expected a string, but received " + typeof svgString);
  }
  // Strip the Byte-Order Mark if the SVG has one
  if (svgString.charCodeAt(0) === 0xfeff) {
    svgString = svgString.slice(1);
  }

  return (
    "data:image/svg+xml," +
    dataURIPayload(collapseWhitespace(svgString).replace(REGEX.quotes, "'"))
  );
};



export const isChecked = (selected, id, key = "id") => {
  return selected?.find?.((ele) => ele[key] === id);
};
export const noop = () => {};

export function getTimeString(str) {
  return str.substr(0, 2) + ":" + str.substr(2, 2);
}
export function minutesToTimeLabel(totalMins) {
  let hours = Math.floor(totalMins / 60);
  let mins = Math.floor(totalMins % 60);
  return `${hours}h ${mins}m`;
}

export const getDatesFromString = (dateStr) => {
  const validDateStr =
    dateStr.substr(0, 4) +
    "-" +
    dateStr.substr(4, 2) +
    "-" +
    dateStr.substr(6, 2);
  let date = new Date(validDateStr);
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
  const dayOfMonth = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.toLocaleDateString("en-US", { year: "2-digit" });

  const longDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
  const shortDate = `${dayOfMonth} ${month}`;
  return {
    shortDate: shortDate,
    longDate: longDate,
  };
};

export const isFunction = (fnc) => typeof fnc === "function";
export const isString = (str) => typeof str === "string";
export const isNumber = (value) => {
  const num = Number(value);
  return typeof num === "number" && !isNaN(num);
};

export function isValidDateString(dateString) {
  const timestamp = Date.parse(dateString);
  return !isNaN(timestamp);
}

export function getNestedValue(obj, keyString) {
  // Use a regular expression to handle both dot and bracket notation
  const keyParts = keyString.match(/([^\[\].]+|\[(\d+)\])/g) || [];

  return keyParts.reduce((acc, key) => {
    // Remove brackets and parse index if it's a number
    const cleanedKey = key.replace(/[\[\]]/g, "");
    const index = parseInt(cleanedKey, 10);

    // Handle array access
    if (Array.isArray(acc)) {
      return index >= 0 && index < acc.length ? acc[index] : undefined;
    }

    // Handle object property access
    return acc && typeof acc === "object" ? acc[cleanedKey] : undefined;
  }, obj);
}

export const getUniqueSperatedString = (str = "", separator = ",") => {
  return [...new Set([...(str?.split(separator) ?? [])])].join(separator);
};

export function getKeysFromArray(arr = [], key = "") {
  return arr?.map((item) => item[key]).filter((item) => item !== undefined);
}

export function testFalsey(val) {
  return val === undefined || val === null || val === "";
}

export const equals = (val1, val2) => {
  return val1 === val2;
};

export const weakEquals = (val1, val2) => {
  return val1 == val2;
};
export function generateUUID() {
  // Generate a UUID v4
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function hideAppScroll(hide) {
  const app = document.getElementsByTagName("body");
  app[0].style.overflow = hide ? "hidden" : "auto";
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
 
export const isValidDate = (date) => {
  try {
    const dateToCheck = new Date(date);
    return !dateToCheck?.toString()?.includes?.("Invalid");
  } catch (error) {
    console.log("error", error);
    return true;
  }
};

export function formatNumber(num, fixed = 2) {
  try {
    return num % 1 === 0 ? num?.toString() : num?.toFixed(fixed);
  } catch (error) {
    console.log("error", error);
    return num;
  }
}

export const getParamsData = (location, optIds) => {
  const currentParams = new URLSearchParams(location.search);
  const searchId = sessionStorage.getItem("searchId");
  let str = "/search?";
  str += "tripNo=" + (currentParams.get("tripNo") ?? "");
  str += "&refNo=" + (currentParams.get("refNo") ?? "");
  str += "&type=" + (currentParams.get("type") ?? "");
  str += "&referrer=" + (currentParams.get("referrer") ?? "");
  str += "&journeyId=" + (currentParams.get("journeyId") ?? "");
  str += "&searchId=" + (searchId ?? "");
  str += "&searchType=D";
  str += "&selected=" + (optIds ?? "");
  return str;
};

export function handleTimeChange(date, time) {
  const timeVal = time?.value;
  const [hours, minutes] = isNullorEmpty(timeVal)
    ? [date.getHours(), date.getMinutes()]
    : timeVal.split(":").map(Number);
  date.setHours(hours);
  date.setMinutes(minutes);
  console.log("timeClick date", date);

  return date;
}

export const readFilesAsDataURLs = (files) => {
  return Promise.all(
    files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    )
  );
};
