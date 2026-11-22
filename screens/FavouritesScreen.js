import React, { useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { findLibrary } from '../lib/libraries';
import { STATUS_HEX, STATUS_LABEL } from '../lib/status';
import { useFavourites } from '../hooks/useFavourites';

export default function FavouritesScreen({ navigation }) {
  const favourites = useFavourites(); // { ids, toggle(id), reload(), notice }

  // Provided: reload when the screen comes back into view.
  useEffect(() => navigation.addListener('focus', favourites.reload), [navigation, favourites.reload]);

// TODO 7: List the saved libraries and let the user remove one.
//
// Outcome: the screen lists every saved library (name, area and its status in words), most recently saved last.
// Tapping a row opens its Detail screen; a "Remove" button on the row removes it with one tap (the
// arrival alert goes with it). With none saved, a short message says how to save one.
// Verify:  save two libraries from their detail screens, open Saved libraries: both are listed. Remove one:
// it disappears at once and stays gone after you close and reopen the app.
// Reflect (in your Notes doc): what should the screen show while the saved list is still loading?
// (The return below shows `list`. favourites.ids are the saved ids; findLibrary(id) gives the full library.)
//
// Your code below ↓
  const list = <Text style={styles.empty}>The saved list is not written yet (TODO 7).</Text>;

  return (
    <View style={styles.container}>
      {list}
      {favourites.notice ? <Text style={styles.notice}>{favourites.notice}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  empty: { color: '#5f6368', padding: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  meta: { marginTop: 2 },
  remove: { paddingVertical: 8, paddingHorizontal: 12 },
  removeText: { color: '#b3261e', fontWeight: '600' },
  notice: { color: '#b3261e', marginTop: 12 },
});
