// formatTimeAgo.js

/**
 * Converts an ISO date string into a "time ago" format using Intl.RelativeTimeFormat.
 * @param {string|Date} isoDate
 * @returns {string}
 */
export function formatTimeAgo(isoDate) {
    const now = new Date();
    const date = new Date(isoDate);
    const diff = (now - date) / 1000; // difference in seconds
  
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });
  
    if (diff < 60) {
      return rtf.format(-Math.floor(diff), "second");
    }
    const diffMinutes = diff / 60;
    if (diffMinutes < 60) {
      return rtf.format(-Math.floor(diffMinutes), "minute");
    }
    const diffHours = diffMinutes / 60;
    if (diffHours < 24) {
      return rtf.format(-Math.floor(diffHours), "hour");
    }
    const diffDays = diffHours / 24;
    if (diffDays < 7) {
      return rtf.format(-Math.floor(diffDays), "day");
    }
    const diffWeeks = diffDays / 7;
    if (diffWeeks < 4) {
      return rtf.format(-Math.floor(diffWeeks), "week");
    }
    const diffMonths = diffDays / 30.44; // average month length
    if (diffMonths < 12) {
      return rtf.format(-Math.floor(diffMonths), "month");
    }
    const diffYears = diffDays / 365.25;
    return rtf.format(-Math.floor(diffYears), "year");
  }