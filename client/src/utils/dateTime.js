export const getMessageTimestamp = (ts) => {
  const dateObj = new Date(ts);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(dateObj);
};
