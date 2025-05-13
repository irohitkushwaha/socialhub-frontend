
// /**
//  * Converts an ISO date string into a "time ago" format using Intl.RelativeTimeFormat.
//  * @param {string|Date} isoDate
//  * @returns {string}
//  */
// export function formatTimeAgo(isoDate) {
//   if (!isoDate) return "";
//   const date = new Date(isoDate);
//   if (isNaN(date.getTime())) return ""; // Invalid date

//   const now = new Date();
//   const diff = (now - date) / 1000; // difference in seconds

//   if (!isFinite(diff)) return "";

//   const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });

//   if (diff < 60) {
//       return rtf.format(-Math.floor(diff), "second");
//   }
//   const diffMinutes = diff / 60;
//   if (diffMinutes < 60) {
//       return rtf.format(-Math.floor(diffMinutes), "minute");
//   }
//   const diffHours = diffMinutes / 60;
//   if (diffHours < 24) {
//       return rtf.format(-Math.floor(diffHours), "hour");
//   }
//   const diffDays = diffHours / 24;
//   if (diffDays < 7) {
//       return rtf.format(-Math.floor(diffDays), "day");
//   }
//   const diffWeeks = diffDays / 7;
//   if (diffWeeks < 4) {
//       return rtf.format(-Math.floor(diffWeeks), "week");
//   }
//   const diffMonths = diffDays / 30.44; // average month length
//   if (diffMonths < 12) {
//       return rtf.format(-Math.floor(diffMonths), "month");
//   }
//   const diffYears = diffDays / 365.25;
//   return rtf.format(-Math.floor(diffYears), "year");
// }


/**
 * Converts an ISO date string into a "time ago" format.
 * @param {string|Date} isoDate - ISO date string or Date object
 * @param {boolean} shorts - If true, returns short format (1w, 10m, etc.) instead of full format
 * @returns {string} - Formatted time ago string
 */
export function formatTimeAgo(isoDate, shorts = false) {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return ""; // Invalid date
  
    const now = new Date();
    const diff = (now - date) / 1000; // difference in seconds
  
    if (!isFinite(diff)) return "";
  
    // For standard long format using RelativeTimeFormat
    if (!shorts) {
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
    // For short format (1w, 10m, etc.)
    else {
      if (diff < 60) {
        return `${Math.floor(diff)}s`;
      }
      const diffMinutes = diff / 60;
      if (diffMinutes < 60) {
        return `${Math.floor(diffMinutes)}m`;
      }
      const diffHours = diffMinutes / 60;
      if (diffHours < 24) {
        return `${Math.floor(diffHours)}h`;
      }
      const diffDays = diffHours / 24;
      if (diffDays < 7) {
        return `${Math.floor(diffDays)}d`;
      }
      const diffWeeks = diffDays / 7;
      if (diffWeeks < 4) {
        return `${Math.floor(diffWeeks)}w`;
      }
      const diffMonths = diffDays / 30.44; // average month length
      if (diffMonths < 12) {
        return `${Math.floor(diffMonths)}mon`;
      }
      const diffYears = diffDays / 365.25;
      return `${Math.floor(diffYears)}y`;
    }
  }