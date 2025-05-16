/**
 * Converts API message format to component format
 */
export const convertApiMessagesToComponentFormat = (
  apiMessages,
  currentUserId
) => {
  if (!apiMessages || !Array.isArray(apiMessages)) return [];

  return apiMessages.map((msg) => ({
    id: msg._id,
    text: msg.MessageText,
    timestamp: msg.TimeStamps,
    isSent: msg.SenderId === currentUserId,
    status: msg.MessageStatus,
    mediaUrl: msg.MessageFileUrl,
    mediaType: msg.MessageType !== "text" ? msg.MessageType : null,
  }));
};

/**
 * Formats a date string to show "Today", "Yesterday", or full date
 */
export const formatChatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
};

/**
 * Formats a timestamp to HH:MM format
 */
export const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};
