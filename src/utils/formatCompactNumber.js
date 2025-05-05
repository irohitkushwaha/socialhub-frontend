// formatCompactNumber.js

/**
 * Formats a number into compact form (e.g., 1.4k, 100k, 1.5M).
 * Only formats if number >= 1000, otherwise returns the original number as string.
 * Accepts string or number input.
 * @param {number|string} value
 * @returns {string}
 */
export function formatCompactNumber(value) {
  if (typeof value === "string") value = Number(value);
  if (isNaN(value)) return "0";
  if (value < 1000) return value.toString();

  // Use built-in JavaScript Intl API for compact notation
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
