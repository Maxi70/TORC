export const formatDate = (date) => {
  return date.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

export const formatDateTime = (date) => {
  return date.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const formatTimeRange = (start, end) => {
  return `${start.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })} – ${end.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;
};
