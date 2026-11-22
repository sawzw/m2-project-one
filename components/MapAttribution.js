import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ATTRIBUTION_TEXT } from '../lib/mapStyle';

// Provided: the credit line for the free map. Keep it on screen whenever the map is showing;
// removing it would break the licence that makes the tiles free. Place it as a sibling after <Map>.
export default function MapAttribution({ style }) {
  return (
    <View pointerEvents="none" style={[styles.wrap, style]}>
      <Text style={styles.text}>{ATTRIBUTION_TEXT}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 6,
    bottom: 6,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  text: { fontSize: 11, color: '#1f1f1f' },
});
