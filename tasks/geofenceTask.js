import { Platform } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { findLibrary } from '../lib/libraries';

export const GEOFENCE_TASK = 'SPOTFINDER_GEOFENCE';
export const CHANNEL_ID = 'library-arrivals';

// TODO 8: Tell the user when they arrive at a saved library.
//
// Outcome: when the phone enters a watched circle, a notification appears at once naming that library
// ("You are at <name>"), even when the app is closed. On Android its channel exists first.
// Leaving a circle, or an error from the system, does not notify (log it instead).
// Define the task at module scope with GEOFENCE_TASK: the system runs it, not your screens.
// Verify:  with a saved library, use your emulator's location controls (or walk) into its circle: the
// notification arrives with the right name, and the console shows an ENTER line.
// Reflect (in your Notes doc): why must the task be defined when the file loads, not inside a component?
//
// Your code below ↓
export async function notifyEnter(libraryName) {}

// TaskManager.defineTask(...) goes here.
