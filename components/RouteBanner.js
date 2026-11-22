import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Provided (from Activity 04): the trip summary. route is { points, distanceText, durationText }.
export default function RouteBanner({ route, libraryName }) {
  if (!route) return null;
  return (
    <View style={styles.banner}>
      <Text style={styles.time}>{route.durationText}</Text>
      <Text style={styles.detail}>{route.distanceText} to {libraryName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: '#1a73e8', paddingTop: 96, paddingBottom: 12, paddingHorizontal: 20 },
  time: { color: '#fff', fontSize: 22, fontWeight: '700' },
  detail: { color: '#d2e3fc', fontSize: 15, marginTop: 2 },
});
