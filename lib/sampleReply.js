import polyline from '@mapbox/polyline';
import { distanceMeters } from './geo';

// Provided: with EXPO_PUBLIC_USE_SAMPLE_ROUTES=1 the app replays a reply shaped like the routing server's
// answer, built from the two points, so you can build and check the logic offline. Made up: not a real
// road route. The shape is real: distance in metres, duration in seconds, geometry as one encoded string.
export function makeSampleReply(origin, destination, mode = 'car') {
  const metres = distanceMeters(origin, destination) * 1.3; // roads are longer than the straight line
  const speed = mode === 'foot' ? 1.4 : 8.5; // metres per second
  const seconds = Math.round(metres / speed);
  const mid = { latitude: (origin.latitude + destination.latitude) / 2 + 0.004, longitude: (origin.longitude + destination.longitude) / 2 };
  const line = polyline.encode([
    [origin.latitude, origin.longitude],
    [mid.latitude, mid.longitude],
    [destination.latitude, destination.longitude],
  ]);
  return {
    code: 'Ok',
    routes: [
      {
        geometry: line,
        legs: [{ steps: [], summary: '', distance: Math.round(metres), duration: seconds }],
        distance: Math.round(metres),
        duration: seconds,
      },
    ],
    waypoints: [],
  };
}
