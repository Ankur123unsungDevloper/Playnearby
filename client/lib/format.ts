export function formatGameDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatGameTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatGameTimeRange(startIso: string, endIso: string) {
  return `${formatGameTime(startIso)} - ${formatGameTime(endIso)}`;
}
