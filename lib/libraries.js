// Provided: the seed data. Pins are approximate: confirm each one on openstreetmap.org before you rely on it.
// status is 'quiet' | 'moderate' | 'busy'; lastQuietReport is when a member last reported the status.
const ago = (minutes) => new Date(Date.now() - minutes * 60 * 1000).toISOString();

export const LIBRARIES = [
  { id: 'um-main', name: 'UM Main Library', area: 'Lembah Pantai', latitude: 3.1226, longitude: 101.6563, status: 'quiet', seatsFree: 42, acWorking: true, lastQuietReport: ago(12) },
  { id: 'kl-city', name: 'KL City Library', area: 'Jalan Raja', latitude: 3.148, longitude: 101.6953, status: 'moderate', seatsFree: 15, acWorking: true, lastQuietReport: ago(95) },
  { id: 'national', name: 'National Library of Malaysia', area: 'Jalan Tun Razak', latitude: 3.1711, longitude: 101.7131, status: 'busy', seatsFree: 3, acWorking: false, lastQuietReport: ago(300) },
  { id: 'bangsar', name: 'Bangsar Community Library', area: 'Bangsar', latitude: 3.129, longitude: 101.671, status: 'quiet', seatsFree: 20, acWorking: true, lastQuietReport: ago(30) },
  { id: 'pj-state', name: 'PJ State Library', area: 'Petaling Jaya', latitude: 3.1073, longitude: 101.6067, status: 'moderate', seatsFree: 9, acWorking: true, lastQuietReport: ago(1500) },
// TODO 1: Add three to five more libraries so the app has 8 to 10.
//
// Outcome: LIBRARIES has 8 to 10 entries. Each new one is a real KL or PJ library with the same fields as the
// five above, coordinates you checked on openstreetmap.org, and a mix of quiet, moderate and busy statuses.
// Verify:  the map (TODO 1 in screens/MapScreen.js) shows every entry; tap two new ones and compare each pin
// with its location on openstreetmap.org.
// Reflect (in your Notes doc): which library was hardest to place, and how did you decide the pin was right?
//
// Your code below ↓
];

export const findLibrary = (id) => LIBRARIES.find((library) => library.id === id) || null;
