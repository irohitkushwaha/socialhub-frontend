/**
 * Formats a timestamp into WhatsApp-style "last seen" message
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted last seen message
 */
export const formatLastSeen = (timestamp) => {
  if (!timestamp) return "Unknown";

  const now = new Date();
  const lastSeenDate = new Date(timestamp);

  // Today - "last seen today at 02:36"
  if (now.toDateString() === lastSeenDate.toDateString()) {
    return `last seen today at ${lastSeenDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  // Yesterday - "last seen yesterday at 13:56"
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (yesterday.toDateString() === lastSeenDate.toDateString()) {
    return `last seen yesterday at ${lastSeenDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  // Older dates - "last seen on 2 April at 04:56"
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = lastSeenDate.getDate();
  const month = months[lastSeenDate.getMonth()];
  const time = lastSeenDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `last seen on ${day} ${month} at ${time}`;
};
