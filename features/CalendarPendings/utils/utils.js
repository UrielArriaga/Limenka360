import { format } from "date-fns";
import { es } from "date-fns/locale";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import utc from "dayjs/plugin/utc";
import { PENDINGS_TYPES_WITH_DATES } from "./../config";

// Extend dayjs with necessary plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

/**
 * Extracts and formats the start dates from an array of objects.
 * @param {Array} array - List of objects with the 'start' property.
 * @returns {Array} - List of formatted dates in "YYYY-MM-DD" format.
 */
export const getStatDatesOfArray = (array = []) => {
  return array.map(el => dayjs(el.start).format("YYYY-MM-DD"));
};

/**
 * Formats an array of dates using the specified format.
 * @param {Array} array - List of dates.
 * @param {string} format - Desired format (e.g., "YYYY-MM-DD").
 * @returns {Array} - List of formatted dates.
 */
export const formatDates = (array, format) => {
  return array.map(date => dayjs(date).format(format));
};

/**
 * Retrieves all the days between a date range and returns them formatted.
 * @param {Array} array - List of objects with 'start' and 'end'.
 * @returns {Array} - List of days in "YYYY-MM-DD" format.
 */
export const getPendingDays = (array = []) => {
  const dates = array
    .map(({ start, end }) => {
      const startDate = dayjs(start);
      const endDate = dayjs(end);

      const numDaysBetweenTwoDates = endDate.diff(startDate, "day");
      if (numDaysBetweenTwoDates < 1) return startDate;

      const daysBetween = Array.from({ length: numDaysBetweenTwoDates }, (_, i) => startDate.add(i + 1, "day"));

      return [startDate, ...daysBetween, endDate];
    })
    .flat();

  return formatDates(dates, "YYYY-MM-DD");
};

/**
 * Verifies if a date is within a given date range.
 * @param {Object} params - Object containing the dates.
 * @param {string|Date} params.startDate - Start date.
 * @param {string|Date} params.endDate - End date.
 * @param {string|Date} params.dateToVerify - Date to verify.
 * @returns {boolean} - True if the date is within the range, false otherwise.
 */
export const isDateInRange = ({ startDate, endDate, dateToVerify }) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const target = dayjs(dateToVerify);

  return target.isSameOrAfter(start) && target.isSameOrBefore(end);
};

/**
 * Calculates the number of days between two dates.
 * @param {string|Date} start - Start date.
 * @param {string|Date} end - End date.
 * @returns {number} - Number of days between the dates.
 */
export const getNumOfDays = (start, end) => {
  return dayjs(end).diff(dayjs(start), "day");
};

/**
 * Formats a date in Spanish with the month's name and AM/PM time.
 * @param {Date} date - Date to format.
 * @returns {string} - Formatted date in Spanish.
 */
export function formatSpanishDate(date) {
  const datePart = format(date, "LLLL d, yyyy", { locale: es });
  const timePart = format(date, "h:mm", { locale: es });
  const suffix = date.getHours() < 12 ? "a.m" : "p.m";
  const finalDatePart = datePart.charAt(0).toUpperCase() + datePart.slice(1);
  return `${finalDatePart} ${timePart} ${suffix}`;
}

export const hasPendingsWithoutEndDate = id => {
  return !PENDINGS_TYPES_WITH_DATES.includes(id);
};

/**
 * Formats a time range based on the duration and associated pendings.
 *
 * @param {string|Date} startDate - Start date.
 * @param {string|Date} endDate - End date.
 * @param {string|number} resourceId - Resource ID.
 * @returns {string} - Formatted time range.
 */
export const getTimeRange = (startDate, endDate, resourceId) => {
  if (getNumOfDays(startDate, endDate) > 1)
    return `${format(new Date(startDate), "d/MM/yy  h:mm a")} - ${format(new Date(endDate), "d/MM/yy  h:mm a")}`;

  return `${format(new Date(startDate), "h:mm a")} ${
    hasPendingsWithoutEndDate(resourceId) ? "" : format(new Date(endDate), "- h:mm a")
  }`;
};

/**
 * Formats text based on the specified option.
 *
 * @param {string} str - The text to be formatted.
 * @param {('firstLetterUpperCase'|'allUpperCase'|'allLowerCase'|'capitalizeEachWord'|'reverse')} option - The format option to apply to the text.
 *    - 'firstLetterUpperCase': Capitalizes only the first letter.
 *    - 'allUpperCase': Converts all text to uppercase.
 *    - 'allLowerCase': Converts all text to lowercase.
 *    - 'capitalizeEachWord': Capitalizes the first letter of each word.
 *    - 'reverse': Reverses the text.
 * @returns {string} - The formatted text based on the provided option.
 */
export const formatText = (str = "", option) => {
  switch (option) {
    case "firstLetterUpperCase":
      return str.charAt(0).toUpperCase() + str.slice(1);

    case "allUpperCase":
      return str.toUpperCase();

    case "allLowerCase":
      return str.toLowerCase();

    case "capitalizeEachWord":
      return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    case "reverse":
      return str.split("").reverse().join("");

    default:
      return str; // If no case matches, returns the original string
  }
};
