import { Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

// Provided: shows our own explanation first. Resolves true when the user taps Continue.
// Every system prompt below must come only after one of these.
const explain = (title, message) =>
  new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        { text: 'Not now', style: 'cancel', onPress: () => resolve(false) },
        { text: 'Continue', onPress: () => resolve(true) },
      ],
      { cancelable: true, onDismiss: () => resolve(false) }
    );
  });

// TODO 10: Ask for each permission with a reason first.
//
// Outcome: askForeground() resolves { ok: true } when location while the app is open is allowed, asking only after
// explaining why (and not at all when it is already allowed). askAlertPermissions() does that, then
// explains and asks for background location, then explains and asks for notifications, in that order.
// Both resolve { ok: false, reason } with a one-sentence reason in plain words when the user says no
// at any step, and stop asking there.
// Verify:  on a fresh install, saving a library shows your explanation, then the system prompt, three times in
// order. Deny the second one: the reason is shown and no notification prompt appears.
// Reflect (in your Notes doc): why must the explanation come before the system prompt and not after?
//
// Your code below ↓
export async function askForeground() {
  return { ok: false, reason: 'Permissions are not written yet (TODO 10).' };
}

export async function askAlertPermissions() {
  return { ok: false, reason: 'Permissions are not written yet (TODO 10).' };
}
