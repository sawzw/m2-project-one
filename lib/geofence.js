import * as Location from 'expo-location';
import { GEOFENCE_TASK } from '../tasks/geofenceTask';

export const GEOFENCE_RADIUS = 200; // metres

// TODO 9: Watch the saved libraries with the operating system.
//
// Outcome: syncGeofences(libraries) makes the phone watch exactly the libraries you pass: one 200 m circle each
// (GEOFENCE_RADIUS), told about entering only. With an empty list it stops watching altogether.
// It resolves to the number of libraries now watched. Calling it twice with the same list changes nothing.
// Verify:  save two libraries: syncGeofences reports 2 and the phone lists two regions. Remove both: it reports 0
// and the phone is no longer watching anything.
// Reflect (in your Notes doc): why replace the whole set each time instead of adding one fence at a time?
//
// Your code below ↓
export async function syncGeofences(libraries) {
  return 0;
}
