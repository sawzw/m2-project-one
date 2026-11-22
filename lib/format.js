// TODO 3: Say how long ago a report was made.
//
// Outcome: timeAgo(iso, now) returns "just now" for under a minute, "N min ago" under an hour,
// "N h ago" under a day and "N days ago" after that, using singular "1 day ago" where it applies.
// now defaults to the current time in milliseconds, so a test can pass a fixed one.
// Verify:  timeAgo of a time 90 seconds before now gives "1 min ago"; 3 hours gives "3 h ago";
// 49 hours gives "2 days ago". The detail screen then shows the same wording.
// Reflect (in your Notes doc): why does the function take `now` as an argument instead of always reading the clock?
//
// Your code below ↓
export function timeAgo(iso, now = Date.now()) {
  return '';
}

// Provided: a distance in metres as short text, for the search list and the trip banner.
export function metresText(metres) {
  return metres < 1000 ? `${Math.round(metres)} m` : `${(metres / 1000).toFixed(1)} km`;
}

// Provided: a time in seconds as short text, e.g. "15 min" or "1 h 58 min".
export function durationText(seconds) {
  const minutes = Math.max(1, Math.round(seconds / 60));
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}
