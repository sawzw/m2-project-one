import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { distanceMeters } from '../lib/geo';
import { metresText } from '../lib/format';

// Props: libraries (the saved list), origin ({ latitude, longitude } or null), onPick(place).
// onPick receives { name, latitude, longitude } and, for one of your libraries, its id as libraryId.
export default function SearchBar({ libraries, origin, onPick }) {
// TODO 2: Suggest places as the user types, leaning towards where they are.
//
// Outcome: typing shows a short list of matching places and choosing one calls onPick with its name and
// coordinates. The list holds the libraries whose name or area contains the text (ignoring capitals),
// nearest first when origin is known, each with its distance. Once at least three letters are typed and
// the user pauses (about half a second), up to five live place suggestions from the free place-search
// service join the list, leaning towards origin; their credit line "Search by Photon, data © OpenStreetMap
// contributors" is shown with them. Typing nothing shows no list. The box never asks the server on every
// keystroke, never lets a slow old answer replace a newer one, and shows one plain sentence if the server
// is busy.
// Verify:  type "bangs": Bangsar Community Library is listed; tap it and the map moves there.
// Type a street name and pause: live suggestions appear once, and the network log shows one request.
// Reflect (in your Notes doc): what does "lean" change about the results, and what does it not change?
//
// Your code below ↓
  return (
    <View style={styles.wrap}>
      <Text style={styles.rowMeta}>Search is not written yet (TODO 2).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', top: 48, left: 12, right: 12, zIndex: 5 },
  input: { height: 44, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 14, fontSize: 16, elevation: 4, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6 },
  list: { backgroundColor: '#fff', borderRadius: 10, marginTop: 4, maxHeight: 240, elevation: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
  rowName: { fontSize: 16, flexShrink: 1 },
  rowMeta: { color: '#5f6368' },
  rowSub: { color: '#5f6368', fontSize: 13 },
  credit: { fontSize: 11, color: '#5f6368', padding: 8, textAlign: 'center' },
  notice: { color: '#b3261e', backgroundColor: '#fff', padding: 8, borderRadius: 8, marginTop: 4 },
});
