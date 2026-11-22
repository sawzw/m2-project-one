import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { findLibrary } from '../lib/libraries';
import { STATUS_HEX, STATUS_LABEL } from '../lib/status';
import { timeAgo } from '../lib/format';
import { useFavourites } from '../hooks/useFavourites';

// Provided: the detail card for one library. It uses timeAgo (TODO 3) for the last report.
export default function DetailScreen({ navigation, route }) {
  const library = findLibrary(route.params && route.params.libraryId);
  const favourites = useFavourites();

  if (!library) return <Text style={styles.missing}>That library is not in the list.</Text>;
  const saved = favourites.ids.includes(library.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{library.name}</Text>
      <Text style={styles.area}>{library.area}</Text>

      <View style={[styles.chip, { backgroundColor: STATUS_HEX[library.status] }]}>
        <Text style={styles.chipText}>{STATUS_LABEL[library.status]}</Text>
      </View>

      <Row label="Seats free" value={String(library.seatsFree)} />
      <Row label="Air-conditioning" value={library.acWorking ? 'Working' : 'Not working'} />
      <Row label="Last quiet report" value={timeAgo(library.lastQuietReport)} />

      <Pressable
        style={styles.primary}
        onPress={() => navigation.navigate('Map', { routeTo: library.id, requestedAt: Date.now() })}
      >
        <Text style={styles.primaryText}>Directions</Text>
      </Pressable>
      <Pressable style={[styles.secondary, saved && styles.secondarySaved]} onPress={() => favourites.toggle(library.id)}>
        <Text style={[styles.secondaryText, saved && styles.secondaryTextSaved]}>{saved ? 'Saved (tap to remove)' : 'Save and alert me when I arrive'}</Text>
      </Pressable>
      {favourites.notice ? <Text style={styles.notice}>{favourites.notice}</Text> : null}
    </ScrollView>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  missing: { padding: 20 },
  name: { fontSize: 24, fontWeight: '700' },
  area: { color: '#5f6368', marginBottom: 12 },
  chip: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 12, marginBottom: 12 },
  chipText: { color: '#fff', fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  label: { color: '#5f6368' },
  value: { fontWeight: '600' },
  primary: { backgroundColor: '#188038', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  secondary: { borderWidth: 1, borderColor: '#1a73e8', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  secondarySaved: { backgroundColor: '#1a73e8' },
  secondaryText: { color: '#1a73e8', fontSize: 16, fontWeight: '600' },
  secondaryTextSaved: { color: '#fff' },
  notice: { color: '#b3261e', marginTop: 12 },
});
