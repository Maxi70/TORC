import Cookies from "universal-cookie";
import { SOCIAL_LINK_TYPES } from "lookup";
import moment from "moment";

export const copyToClipboard = async (text, callback = null) => {
  await navigator.clipboard.writeText(text);

  if (!callback) return;
  callback(true);
  return setTimeout(() => callback(false), 3000);
};

export const isValidUrl = (url) => {
  const validUrlRegex = new RegExp(
    "^(?:(?:http(?:s)?)://)?(?:\\S+(?::(?:\\S)*)?@)?(?:(?:[a-z0-9\u00a1-\uffff](?:-)*)*(?:[a-z0-9\u00a1-\uffff])+)(?:\\.(?:[a-z0-9\u00a1-\uffff](?:-)*)*(?:[a-z0-9\u00a1-\uffff])+)*(?:\\.(?:[a-z0-9\u00a1-\uffff]){2,})(?::(?:\\d){2,5})?(?:/(?:\\S)*)?$"
  );

  return validUrlRegex.test(url);
};

/**
 * Extracts a username from the social media url
 *
 * Reference: https://github.com/lorey/social-media-profiles-regexs
 *
 * @param {String} url The value
 * @param {String} type The social media type
 * @returns String The extracted username if found, else emtpy string
 */
export const extractUsernameFromUrl = (url, type) => {
  let regularExpression;
  const decodedUrl = decodeURIComponent(url);

  switch (type) {
    case SOCIAL_LINK_TYPES.TWITTER:
      if (!decodedUrl.includes("twitter") && !decodedUrl.includes("x.com")) {
        return decodedUrl;
      }
      regularExpression =
        "(?:https?:\\/\\/)?(?:[A-z]+\\.)?(?:twitter|x)\\.com\\/@?(?!home|share|privacy|tos)(?<username>[A-z0-9_]+)\\/?";
      break;
    case SOCIAL_LINK_TYPES.FACEBOOK:
      if (!decodedUrl.includes("facebook") && !decodedUrl.includes("fb")) {
        return decodedUrl;
      }
      regularExpression =
        "(?:https?:\\/\\/)?(?:www\\.)?(?:facebook|fb)\\.com\\/(?<profile>(?![A-z]+\\.php)(?!marketplace|gaming|watch|me|messages|help|search|groups)[\\w.\\-]+)\\/?";
      break;
    case SOCIAL_LINK_TYPES.INSTAGRAM:
      if (!decodedUrl.includes("instagram")) {
        return decodedUrl;
      }
      regularExpression =
        "(?:https?:\\/\\/)?(?:www\\.)?(?:instagram\\.com|instagr\\.am)\\/(?<username>[A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\\.(?!\\.))){0,28}(?:[A-Za-z0-9_]))?)";
      break;
    case SOCIAL_LINK_TYPES.LINKEDIN:
      if (!decodedUrl.includes("linkedin")) {
        return decodedUrl;
      }
      regularExpression =
        "(?:https?:\\/\\/)?(?:[\\w]+\\.)?linkedin\\.com\\/in\\/(?<permalink>[_\\A-Za-zÀ-ÖØ-öø-ÿ-0-9\\-]+)\\/?|(?:https?:\\/\\/)?(?:[\\w]+\\.)?linkedin\\.com\\/company\\/(?<company_permalink>[A-z0-9-À-ÿ\\.]+)\\/?";
      break;
    case SOCIAL_LINK_TYPES.HASHNODE:
      if (!decodedUrl.includes("hashnode")) {
        return decodedUrl;
      }
      regularExpression =
        "(?:https?:\\/\\/)?(?<domain>[a-zA-Z0-9]+)\\.hashnode\\.dev|(?:https?:)?\\/\\/hashnode.com\\/@(?<username>[a-zA-Z0-9]+)";
      break;
    case SOCIAL_LINK_TYPES.CALENDAR:
    case SOCIAL_LINK_TYPES.PORTFOLIO:
    case SOCIAL_LINK_TYPES.STACKOVERFLOW:
    case SOCIAL_LINK_TYPES.GITHUB:
      // No regular expression yet for these
      return decodedUrl;
    default:
      throw new Error(`Unsupported type for formatting social url ${type}`);
  }

  const regex = new RegExp(regularExpression, "g");
  let match = regex.exec(decodedUrl);

  let extractedValue;

  try {
    if (
      type === SOCIAL_LINK_TYPES.HASHNODE ||
      type === SOCIAL_LINK_TYPES.LINKEDIN
    ) {
      // Hashnode and linkedin have two groups
      // For Linkedin, we still need to figure out how to remember
      // if it's a company or personal url
      // Right now, we shall assume it's personal
      extractedValue = match[1] || match[2] || "";
    } else {
      extractedValue = match[1] || "";
    }
  } catch (err) {
    // The value entered seems to not conform to the social link type. Ignore the value entered
    extractedValue = "";
  }

  return extractedValue;
};

export const roundToSpecificNumber = (num, rounder) => {
  const roundedNumber = Math.round(num / rounder) * rounder;

  return roundedNumber;
};

export const getJobDuration = (jobLength, jobLengthInWeeks) => {
  let title = "";
  if (jobLengthInWeeks) {
    title = jobLengthInWeeks > 1 ? " weeks" : " week";
    return `${jobLengthInWeeks}${title}`;
  } else if (jobLength) {
    title = jobLength > 1 ? " months" : " month";
    return `${jobLength}${title}`;
  }

  return "";
};

export const capitalize = (value) => {
  if (!value) {
    return "";
  }

  switch (value) {
    case "LINKEDIN":
      return "LinkedIn";
    case "GITHUB":
      return "GitHub";
    case "STACKOVERFLOW":
      return "Stack Overflow";
    default:
      return value[0].toUpperCase() + value.slice(1).toLowerCase();
  }
};

export const setReferralCookies = (params) => {
  const cookies = new Cookies();

  let refCodeResult = params.get("referralCode");
  let refSource = params.get("refSource");

  if (refCodeResult) {
    const config = { path: "/" };

    // Restrict to domain only in non local environments
    if (window.location.hostname !== "localhost") {
      config.domain = "torc.dev";
    }

    cookies.set("referralCode", refCodeResult, config);
    cookies.set("refSource", refSource, config);
  }
};

/**
 * Given an array of dates (that may or may not overlap), returns the number of months
 * b/w them
 * @param {Array} dates Array of date objects of the format { startDate, endDate }
 */
export const getWorkExperience = (dates = []) => {
  if (dates.length === 0) {
    return 0;
  }

  // Sort the dates by their start date to ensure we identify overlaps
  dates.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const dateRanges = [];
  let rangeStart = new Date(dates[0].startDate);
  // When working with end date, note that it could be empty, in which case
  // use today's date
  let rangeEnd = dates[0].endDate ? new Date(dates[0].endDate) : new Date();

  // First, let's ensure that the dates don't overlap, and if they do, let's find
  // the longest non overlapping segment among the overlaps
  for (let i = 1; i < dates.length; i++) {
    const newStartDate = new Date(dates[i].startDate);
    const newEndDate = dates[i].endDate
      ? new Date(dates[i].endDate)
      : new Date();

    if (newStartDate <= rangeEnd && newEndDate <= rangeEnd) {
      // Date 1:     |-----------------|
      // Date 2:           |-------|
      // Final Date: |-----------------|
      // This date range overlaps with the previous range but is shorter than it
      // We can ignore it
      continue;
    }

    if (newStartDate <= rangeEnd && newEndDate > rangeEnd) {
      // Date 1:     |-----------------|
      // Date 2:                  |-------|
      // Final Date: |--------------------|
      // This date range overlaps with the previous range but it ends after it
      // Consider the end, and disregard the start
      rangeEnd = newEndDate;
    }

    if (newStartDate > rangeEnd) {
      // Date 1:     |-----------------|
      // Date 2:                           |-------|
      // Final Date: |-----------------|   |-------|
      // No overlap. We have two different date ranges
      // Finalize the first date range while we still determine the true range of the second dates
      dateRanges.push({ startDate: rangeStart, endDate: rangeEnd });
      rangeStart = newStartDate;
      rangeEnd = newEndDate;
    }
  }

  // Let's not forget to finalize the last range
  dateRanges.push({ startDate: rangeStart, endDate: rangeEnd });

  // We now have the final date ranges, for which we can determine the total length
  let months = 0;

  for (let i = 0; i < dateRanges.length; i++) {
    months += moment(dateRanges[i].endDate).diff(
      moment(dateRanges[i].startDate),
      "months"
    );
  }

  return months;
};
