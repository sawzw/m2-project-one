import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'm2.spotfinder.favourites'; // a JSON array of library ids

// TODO 6: Keep favourite libraries on the phone.
//
// Outcome: loadFavourites() resolves to the saved array of library ids ([] when nothing is saved or the saved text
// is damaged). toggleFavourite(id) adds the id when it is missing and removes it when present, saves the
// result so it survives closing the app, and resolves to the new array. An id is never saved twice.
// Verify:  toggle "um-main" twice: you get ["um-main"], then []. Toggle it once, close and reopen the app:
// loadFavourites() still returns it.
// Reflect (in your Notes doc): AsyncStorage only stores strings. What did you have to do to keep an array?
//
// Your code below ↓
export async function loadFavourites() {
  return [];
}

export async function toggleFavourite(id) {
  return [];
}
