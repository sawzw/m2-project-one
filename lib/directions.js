import { HTTP_HEADERS } from './mapStyle';
import { metresText, durationText } from './format';
import { makeSampleReply } from './sampleReply';
// Add the import you need for TODO 4 above this line.

// The free routing server (OSRM, run by FOSSGIS). No key and no account, but it is a shared demo:
// keep to one request per second, no commercial use, and no promise it is always up.
const BASE_URL = 'https://routing.openstreetmap.de';
const USE_SAMPLES = process.env.EXPO_PUBLIC_USE_SAMPLE_ROUTES === '1';

// TODO 4: Turn a trip into a routing request, and the reply into a route.
//
// Outcome: buildDirectionsUrl({ origin, destination, mode }) returns one URL string asking the server above for the
// route between two { latitude, longitude } points in that travel mode ('car' or 'foot'), with the
// whole line of the route included as one encoded string. The server wants longitude before latitude.
// decodeRoute(reply) returns { points, distanceText, durationText }: points is an array of
// [longitude, latitude] pairs that follows the road; the two text values are ready to show (the helpers
// imported above turn metres and seconds into words). A reply with no route gives null.
// Verify:  decodeRoute(makeSampleReply(a, b)) has more than two points and a durationText; paste a built URL into a
// browser to see JSON with "code": "Ok" and a distance in metres.
// Reflect (in your Notes doc): the pairs inside the encoded string come out latitude first. What happens on the
// map if you hand them over unchanged?
//
// Your code below ↓
export function buildDirectionsUrl({ origin, destination, mode = 'car' }) {
  return '';
}

export function decodeRoute(reply) {
  return null;
}

// Provided: asks politely. It replays a made-up sample when EXPO_PUBLIC_USE_SAMPLE_ROUTES=1, remembers answers
// it has already fetched, waits so requests are at least a second apart, and names the app in the headers.
const routeCache = new Map();
const MIN_GAP_MS = 1100;
let lastRequestAt = 0;
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const key5 = (n) => n.toFixed(5);

export async function fetchRoute({ origin, destination, mode = 'car' }) {
  if (USE_SAMPLES) return decodeRoute(makeSampleReply(origin, destination, mode));

  const cacheKey = `${mode}|${key5(origin.latitude)},${key5(origin.longitude)}|${key5(destination.latitude)},${key5(destination.longitude)}`;
  if (routeCache.has(cacheKey)) return routeCache.get(cacheKey);

  const wait = lastRequestAt + MIN_GAP_MS - Date.now();
  if (wait > 0) await pause(wait);
  lastRequestAt = Date.now();

  let response;
  try {
    response = await fetch(buildDirectionsUrl({ origin, destination, mode }), { headers: HTTP_HEADERS });
  } catch (error) {
    throw new Error('Could not reach the routing server. Check your connection, or set EXPO_PUBLIC_USE_SAMPLE_ROUTES=1 to use a made-up sample.');
  }
  if (!response.ok) {
    throw new Error(`The routing server is busy (${response.status}). Wait a moment and try again.`);
  }
  const reply = await response.json();
  if (reply.code !== 'Ok' && reply.code !== 'NoRoute') {
    throw new Error(`The routing server said ${reply.code}.`);
  }
  const route = decodeRoute(reply);
  routeCache.set(cacheKey, route);
  return route;
}
