// formatDuration.js

/**
 * Converts seconds (can be float) into hh:mm:ss or m:ss format.
 * Examples:
 *   16.65351   => "0:17"
 *   895        => "14:55"
 *   3605       => "1:00:05"
 * @param {number} seconds
 * @returns {string} formatted time string
 */
export function formatDuration(seconds) {
  if (typeof seconds === "string") seconds = Number(seconds);
  if (seconds < 1) return "0:00";
  const rounded = Math.round(seconds);
  const h = Math.floor(rounded / 3600);
  const m = Math.floor((rounded % 3600) / 60);
  const s = rounded % 60;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${m}:${s.toString().padStart(2, "0")}`;
  }
}
