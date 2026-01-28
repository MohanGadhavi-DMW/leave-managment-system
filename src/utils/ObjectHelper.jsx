import { Environment, redirectionUrl } from "../api/Urls";
import { format } from "date-fns";

export const isDevEnv = () => Environment === "development";
export const isDevEnvInt = () => Environment === "dev_integration";
export const isLocalEnv = () => Environment === "local";
export const isUatEnv = () => Environment === "uat";

export const isFormValid = (errors) => {
  if (Object.keys(errors).length > 0) {
    let shakeDone = false;
    // console.log("errors ----------> ", errors);
    Object.keys(errors).map((fieldName, idx) => {
      if (!shakeDone && fieldName)
        shakeDone = checkError(errors, errors[fieldName], fieldName, idx);
    });
    return false;
  }
  return true;
};

const checkError = (errors, ele, fieldName, idx) => {
  var element = document.getElementById(fieldName);
  // console.log("errors -", ele, fieldName, element);
  if (element !== null) {
    scrollAndShake(element);
    return true;
  } else if (Array.isArray(ele)) {
    let shakeDone = false;
    ele.map((fieldNameLevel1, idx1) => {
      if (!shakeDone && fieldNameLevel1) {
        // console.log("errors fieldNameLevel1 -", fieldNameLevel1);
        if (isObject(fieldNameLevel1)) {
          Object.keys(fieldNameLevel1).map((fieldNameLevel2, idx2) => {
            // console.log("errors fieldNameLevel LOOP -", fieldNameLevel2);
            if (!shakeDone && fieldNameLevel2) {
              shakeDone = checkError(
                errors,
                fieldNameLevel1[fieldNameLevel2],
                fieldName + "-" + idx1 + "-" + fieldNameLevel2,
                idx1,
              );
            }
          });
        } else {
          shakeDone = checkError(
            errors,
            ele[fieldNameLevel1],
            fieldName + "-" + idx1 + "-" + fieldNameLevel1,
            idx,
          );
        }
      }
    });
    return shakeDone;
  }
  return false;
};

export const isObject = (obj) =>
  obj && obj != null && typeof obj === "object" && Object.keys(obj).length > 0;

const scrollAndShake = (element) => {
  if (element.tagName === "DIV") {
    var headerOffset = 80;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  } else if (element.type === "button") {
    element.click();
    element.scrollTo();
  } else {
    element.focus();
    element.scrollTo();
  }
  element.classList.add("error");
  setTimeout(() => element.classList.remove("error"), 2000);
};

export const GenerateRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64); // Comment this if not using base64
  const bytes = new Uint8Array(binaryString.length);
  return bytes.map((byte, i) => binaryString.charCodeAt(i));
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function toTitleCase(str) {
  return str
    ? str.replace(
        /\w\S*/g,
        (text) =>
          text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
      )
    : "";
}

export function formatString(template, ...args) {
  if (!args || args.length === 0) return template;

  return template.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] === "undefined" ? match : args[index];
  });
}

export function textTruncate(str, wordLength = 2, maxLength) {
  if (!isNullorEmpty(str)) {
    const words = ("" + str).split(",");
    let joins = words.slice(0, wordLength).join(",");
    if (maxLength && maxLength > 0 && joins.length > maxLength) {
      joins = str.substring(0, maxLength) + "...";
    }
    return joins;
  }
  return "";
}

export const getWord = (text = "") => {
  let word =
    text?.split(" ")[0].length < 2
      ? text.split(" ")[0] + " " + text?.split(" ")[1]
      : text?.split(" ")[0];

  if (word.length > 10) {
    let trimedWord = word.slice(0, 10) + "...";

    return (
      // <Tooltip
      //   animate={{
      //     mount: { scale: 1, y: 0 },
      //     unmount: { scale: 0, y: 25 },
      //   }}
      //   content={text}
      // >
      //   {trimedWord}
      // </Tooltip>
      <>Tool tip coment</>
    );
  }
  return word.endsWith(",") ? word.slice(0, -1) : word;
};

// export const redirectToNewPage = ({
//   linkURI,
//   baseURL,
// referrerBaseURL,
//   referrer = false,
//   newWindow = false,
// }) => {
//   if (linkURI)
//     if (linkURI.indexOf("http") !== -1) {
//       window.open(linkURI, newWindow ? "_blank" : "_self");
//     } else
//       window.open(
//         (referrer ? referrerBaseURL : baseURL) + linkURI,
//         newWindow ? "_blank" : "_self"
//       );
// };

export const generateRandomKey = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const shuffleColors = (colors = []) => {
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  return colors;
};

export const getChartBorderColor = (bgColor, idx, colors = []) => {
  return (
    bgColor ||
    (idx > colors.length - 1
      ? colors[idx % colors.length].borderColor
      : colors[idx].borderColor)
  );
};

export const getChartBackgroundColor = (
  bgColor,
  idx,
  colors = [],
  isDark = false,
) => {
  return (
    bgColor ||
    (idx > colors.length - 1
      ? isDark === true
        ? colors[idx % colors.length].backgroundColorDark
        : colors[idx % colors.length].backgroundColor
      : isDark === true
      ? colors[idx].backgroundColorDark
      : colors[idx].backgroundColor)
  );
};

export const isNull = (obj) => {
  return !obj || obj === null || obj === undefined;
};

export const isNullorEmpty = (obj) => {
  return (
    !obj ||
    isNull(obj) === true ||
    (typeof obj === "string" && obj.trim() === "")
  );
};

export const isNullObject = (obj) => {
  return (
    isNullorEmpty(obj) ||
    (obj.constructor === Object && Object.keys(obj).length === 0)
  );
};

export const isNullArray = (obj) => {
  return !obj || obj == null || !Array.isArray(obj) || obj.length === 0;
};

export const isNumber = (str) => {
  return str === null || (typeof str === "string" && str.trim() === "")
    ? false
    : !isNaN(str);
};

export const NumVal = (str) => {
  return isNumber("" + str) ? parseFloat("" + str) : 0;
};

export const getReferrer = (referrer) => {
  return (
    (isNullorEmpty(referrer) ? redirectionUrl : "https://" + referrer) + "/"
  );
};

export const getMinMaxDate = (reqTypeWidget, tripType, multipleRoute, idx) => {
  return idx <= 0 || tripType !== "M"
    ? {
        minDate: reqTypeWidget?.depDate?.min,
        maxDate: reqTypeWidget?.depDate?.max,
      }
    : {
        minDate: format(multipleRoute[idx - 1].depDate, "yyyy-MM-dd"),
        maxDate: reqTypeWidget?.depDate?.max,
      };
};

export const isFilterApplied = (filter) => {
  let isChecked = false;
  Object.keys(filter).map((node, index) => {
    filter[node].map((item) => {
      if (item.isChecked === true) isChecked = true;
    });
  });

  return isChecked;
};

export const customRound = (val) => {
  if (val === null) return "";
  const numval = NumVal("" + val);
  return Math.round(numval);
};

export const removeSelfArrange = (data) => {
  if (isNullArray(data)) return [];
  const values = [];
  data?.map((item) => {
    if (item.id !== "Self Arranged") {
      values.push({ id: item.id, name: item.name });
    }
  });
  return values;
};
