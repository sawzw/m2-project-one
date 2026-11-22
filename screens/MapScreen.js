import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Camera, Map, Marker, UserLocation } from '@maplibre/maplibre-react-native';
import * as Location from 'expo-location';
import SearchBar from '../components/SearchBar';
import RouteBanner from '../components/RouteBanner';
import MapAttribution from '../components/MapAttribution';
import { LIBRARIES, findLibrary } from '../lib/libraries';
import { fetchRoute } from '../lib/directions';
import { askForeground } from '../lib/permissions';
import { MAP_STYLE_URL } from '../lib/mapStyle';

// Map positions are [longitude, latitude]: longitude comes first. The rest of the app keeps
// places as { latitude, longitude }; swap them where a place meets the map.
const KL_SENTRAL = { latitude: 3.1343, longitude: 101.686 }; // used when there is no GPS fix

// TODO 1: Show every library as a pin coloured by how quiet it is.
//
// Outcome: markerColour(status) gives 'green' for quiet, 'yellow' for moderate and 'red' for busy (anything else
// red). Every library in LIBRARIES is drawn on the map with that colour, and tapping its pin opens the
// Detail screen for that library (that route takes the library's id as `libraryId`).
// Verify:  open the app: all pins are on the map in three colours matching the data. Tap one: its detail opens.
// Reflect (in your Notes doc): the colour is a second way to show the status. Who might it not work for?
//
// Your code below ↓
const markerColour = (status) => 'red';

export default function MapScreen({ navigation, route: navRoute }) {
  const cameraRef = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [trip, setTrip] = useState(null); // { library, route } while directions are showing
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [pinned, setPinned] = useState(null); // a search result that is not one of the libraries

  // Provided: the phone's position, with a KL Sentral fallback so there is always an origin.
  useEffect(() => {
    (async () => {
      const result = await askForeground();
      if (!result.ok) {
        setOrigin(KL_SENTRAL);
        setMessage(`${result.reason} Routing from KL Sentral instead.`);
        return;
      }
      const fix = await Location.getCurrentPositionAsync({});
      setOrigin({ latitude: fix.coords.latitude, longitude: fix.coords.longitude });
    })();
  }, []);

  // Provided: the Detail screen's "Directions" button comes back here with routeTo = a library id.
  const routeTo = navRoute.params && navRoute.params.routeTo;
  const requestedAt = navRoute.params && navRoute.params.requestedAt;
  useEffect(() => {
    const library = routeTo ? findLibrary(routeTo) : null;
    if (!library || !origin) return;
    let cancelled = false;
    setLoading(true);
    setMessage(null);
    fetchRoute({ origin, destination: library, mode: 'car' })
      .then((result) => {
        if (cancelled) return;
        if (result) setTrip({ library, route: result });
        else setMessage('No route found between these two points.');
      })
      .catch((error) => !cancelled && setMessage(error.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [routeTo, requestedAt, origin]);

// TODO 5: Draw the route and frame it.
//
// Outcome: when a route arrives (trip is set) it is drawn on the map as a blue line (#1a73e8, width 5) that follows
// the roads, the camera moves so the whole line is on screen with room for the banner, and the
// RouteBanner shows the travel time and distance for that library. With no trip, nothing is drawn.
// Verify:  open a library, tap Directions: the line runs from you to it along the road and both ends are visible;
// the banner shows a time and a distance. Ask for a different library: the old line is replaced.
// Reflect (in your Notes doc): the time comes from the road network with no live traffic. Which number on the
// banner would a student trust least, and why?
// (The map's own children go in the JSX below, marked TODO 5; any camera movement goes here.)
//
// Your code below ↓

  // Provided: move the map to a search result and drop a blue pin if it is not one of the libraries.
  const focusOn = (place) => {
    setPinned(place.libraryId ? null : place);
    cameraRef.current && cameraRef.current.flyTo({ center: [place.longitude, place.latitude], zoom: 15, duration: 600 });
  };

  return (
    <View style={styles.container}>
      <Map style={styles.map} mapStyle={MAP_STYLE_URL} attribution>
        <Camera ref={cameraRef} initialViewState={{ center: [101.67, 3.13], zoom: 10.5 }} />
        <UserLocation />
{/* TODO 1: your library pins go here. */}
        {pinned ? (
          <Marker lngLat={[pinned.longitude, pinned.latitude]}>
            <View style={styles.pinnedDot} />
          </Marker>
        ) : null}
{/* TODO 5: your route line goes here. */}
      </Map>
      <MapAttribution />

      <SearchBar libraries={LIBRARIES} origin={origin} onPick={focusOn} />
{/* TODO 5: show the RouteBanner here. */}

      <View style={styles.controls}>
        {loading ? <ActivityIndicator /> : null}
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <Pressable style={styles.button} onPress={() => navigation.navigate('Favourites')}>
          <Text style={styles.buttonText}>Saved libraries</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  map: { flex: 1 },
  pinnedDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#1a73e8', borderWidth: 3, borderColor: '#fff' },
  controls: { position: 'absolute', left: 16, right: 16, bottom: 44 },
  message: { color: '#b3261e', backgroundColor: '#fff', padding: 8, borderRadius: 8, marginBottom: 8 },
  button: { backgroundColor: '#1a73e8', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
