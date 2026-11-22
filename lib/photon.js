import { HTTP_HEADERS } from './mapStyle';

// Provided: place search on Photon, a free public search server built on OpenStreetMap data.
// It is fair-use only ("extensive usage will be throttled"), so this module keeps traffic small:
// a minimum of three letters, five results, an identifying User-Agent and a cache that answers
// a repeated query without a request. Pausing between keystrokes is the caller's job.
// Results credit: "Search by Photon, data © OpenStreetMap contributors".
const BASE_URL = 'https://photon.komoot.io/api/';

export const MIN_CHARS = 3;

// near is { latitude, longitude } or null. With it, results close to that point rank higher.
export function buildSearchUrl(text, near) {
  const params = [`q=${encodeURIComponent(text.trim())}`, 'limit=5', 'lang=en'];
  if (near) params.push(`lat=${near.latitude}`, `lon=${near.longitude}`);
  return `${BASE_URL}?${params.join('&')}`;
}

// Photon sends a GeoJSON FeatureCollection: each coordinate pair is [longitude, latitude].
export function parseFeatures(reply) {
  const features = (reply && reply.features) || [];
  return features
    .filter((feature) => feature.geometry && feature.geometry.type === 'Point')
    .map((feature) => {
      const p = feature.properties || {};
      const [longitude, latitude] = feature.geometry.coordinates;
      const street = [p.housenumber, p.street].filter(Boolean).join(' ');
      const parts = [street, p.district, p.city, p.state].filter(Boolean);
      const subtitle = parts.filter((part, index) => part !== p.name && parts.indexOf(part) === index).join(', ');
      return {
        id: `${p.osm_type || 'X'}${p.osm_id || `${latitude},${longitude}`}`,
        name: p.name || street || 'Unnamed place',
        subtitle,
        latitude,
        longitude,
      };
    });
}

const cache = new Map();

// Resolves to a list of { id, name, subtitle, latitude, longitude }. Pass an AbortSignal to cancel.
export async function searchPlaces(text, { near = null, signal } = {}) {
  const query = text.trim();
  if (query.length < MIN_CHARS) return [];
  const where = near ? `${near.latitude.toFixed(2)},${near.longitude.toFixed(2)}` : 'anywhere';
  const key = `${query.toLowerCase()}|${where}`;
  if (cache.has(key)) return cache.get(key);

  const response = await fetch(buildSearchUrl(query, near), { headers: HTTP_HEADERS, signal });
  if (!response.ok) {
    throw new Error(`Place search is busy (${response.status}). Wait a moment and try again.`);
  }
  const results = parseFeatures(await response.json());
  cache.set(key, results);
  return results;
}
