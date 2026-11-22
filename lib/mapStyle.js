// Provided: the free basemap and the rules that come with it.
//
// The tiles come from CARTO (map data from OpenStreetMap). Using them is free, but the credit
// line below is part of the licence: it must stay visible on every screen that shows the map.
export const ATTRIBUTION_TEXT = '© OpenStreetMap contributors © CARTO';

const STYLE_URL = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';

// Optional: a free CARTO key (no account, no card) from carto.com/basemaps/apikey. The map works
// without one today. EXPO_PUBLIC_ values are compiled into the app, so treat the key as public:
// one key per student, kept in the git-ignored .env, never pasted into chat or a screenshot.
const CARTO_KEY = process.env.EXPO_PUBLIC_CARTO_KEY;

export const MAP_STYLE_URL = CARTO_KEY ? `${STYLE_URL}?key=${encodeURIComponent(CARTO_KEY)}` : STYLE_URL;

// Sent with every request to the free search and routing servers so their operators can see
// which app is calling. Names the app only: never put a person's name or email in here.
export const HTTP_HEADERS = { 'User-Agent': 'TelebortM2-Course/1.0 (student project; telebort.com)' };
