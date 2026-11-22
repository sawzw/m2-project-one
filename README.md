# Project 01 — SpotFinder

> **🛠️ Stack for this lesson** — Expo SDK 58 / React Native 0.88 + native platform APIs · runs in a development build on a real phone (native modules do not run in Expo Go).
> 📥 Template: [/learn/m2/template/project-01-spotfinder](/learn/m2/template/project-01-spotfinder)

A live library finder for your study group. The starter is a working app shell: a free MapLibre map, a detail screen, a saved-libraries screen, five seed libraries, and the wiring between them. Ten TODOs mark the Quest 1 skills you add: coloured pins, search, directions, saved libraries and arrival alerts.

**Time:** one to two weeks (see the suggested time split in the project lesson) · **Concept:** Capstone — Maps, Search and Routes

---

## What You'll Build

| # | TODO | File | Required item |
|---|------|------|---------------|
| 1 | Three to five more libraries, so there are 8 to 10; each library drawn as a pin coloured by its status, tap opens its detail | `lib/libraries.js`, `screens/MapScreen.js` | 1 |
| 2 | Search suggestions (your libraries plus live places) that lean towards where you are | `components/SearchBar.js` | 2 |
| 3 | "How long ago" wording for the last quiet report | `lib/format.js` | 3 |
| 4 | The routing request, and the reply turned into a route with distance and time text | `lib/directions.js` | 4 |
| 5 | The route drawn and framed on the map, with a trip banner | `screens/MapScreen.js` | 4 |
| 6 | Favourite libraries kept on the phone | `lib/favourites.js` | 6 |
| 7 | The saved list, with one-tap remove | `screens/FavouritesScreen.js` | 6 |
| 8 | A notification when you arrive at a saved library | `tasks/geofenceTask.js` | 5 |
| 9 | The saved libraries watched by the operating system, 200 m each | `lib/geofence.js` | 5 |
| 10 | Each permission asked for with a reason first | `lib/permissions.js` | 7 |

There are no commented-out solutions in the code. Each TODO states an outcome, a way to check it and a question to answer in your Notes doc. Read what is already there, work out what each TODO asks for, and write it.

**Already in the starter:** `App.js` (navigation and the notification handler); `screens/DetailScreen.js` and the map shell in `screens/MapScreen.js`; `hooks/useFavourites.js` (saving a library asks for permissions and starts its alert); `components/RouteBanner.js`; `lib/libraries.js` (five seed libraries); `lib/geo.js`, `lib/status.js` and `lib/sampleReply.js` (a made-up route for offline checks); `lib/photon.js` (the polite place-search request, answers remembered); `lib/mapStyle.js` and `components/MapAttribution.js` (the free basemap and its credit line).

## Run It

```bash
npm install --legacy-peer-deps
npx expo start --dev-client
```

Open your **development build** (the app from Activity 19) on a phone that is on the same Wi-Fi as your computer. It finds the running server and loads your code. Native modules do not run in Expo Go.

No key or account is needed: tiles come from CARTO, place search from Photon and routes from the OSRM demo server, all free and shared. Be polite to them: one route request per tap, a pause before each search, answers remembered. Set `EXPO_PUBLIC_USE_SAMPLE_ROUTES=1` in a git-ignored `.env` (see `.env.example`) to use a made-up sample route offline or when the shared server is busy. The development build from Activity 19 already has the location (with background access) and notifications plugins; it also needs the `@maplibre/maplibre-react-native` plugin, so rebuild if yours predates it.

The five seed pins are approximate: check each on openstreetmap.org, and check your own three to five the same way.

## Verify

Your project is done when, on a real device:

- [ ] 8 to 10 libraries are on the map as green, yellow and red pins that match their status.
- [ ] Typing in the search box lists suggestions, and choosing one moves the map; the network log shows one search request per pause, not per letter.
- [ ] Tapping a pin opens its detail: name, status, and a last report such as "12 min ago".
- [ ] Directions draws a line from you to the library with a distance and a travel time (no live traffic).
- [ ] "© OpenStreetMap contributors © CARTO" is visible on the map.
- [ ] Saving a library shows a reason before each of the three system prompts, and walking into its circle sends a notification.
- [ ] Saved libraries survive closing and reopening the app, and can be removed with one tap.

## Stretch

Optional. Pick one and say in your Notes doc what you tried:

- **Crowdsourced status updates** — a "report quiet now" button that shares the update to the study group through a deep link.
- **Multi-stop routes** — directions that visit two libraries in one trip.
- **Offline mode** — cached library data and the last known status with no internet.
- **Library photos** — let each library carry a photo of your own, stored with the saved list.

## 🪞 Reflect on Your Work

Answer in 2-3 sentences each, in your Notes doc. Your tutor reads these as part of grading.

1. **What did you learn that you didn't know before?** Name the most surprising thing — a permission quirk, a platform difference, a debugging story.
2. **How did you collaborate with AI?** If you used Claude / ChatGPT / Cursor / Copilot, what part of the work did *you* contribute — the prompt, the verification, the design decision, the bug-fix? If you didn't use AI, what was the hardest thing to figure out alone?
3. **How do you know your code works?** Describe one specific thing you did to confirm — the device test you ran, the screenshot you took, the behavior you watched.

> AI is a great collaborator. Owning your thinking, verifying the output, and explaining your design choices is what *learning* looks like in this course.

## 📱 Device Evidence (required, 25% of grade)

Full marks need a real device, not a simulator or Expo's web preview. Link these in your project Notes doc, under a heading **Device Notes**:

1. **`screenshot-portrait.png`** — one full-screen portrait screenshot from your device showing the map with coloured pins, with the status bar visible (the clock and battery prove it is a real device).
2. **`recording.mp4`** — a 1 to 2 minute screen recording of your real device: open the map, search a library, tap its pin, get directions, then show the arrival notification (simulated location is fine).
3. **Device Notes** (80–150 words): the phone model and OS, what worked first try, the exact text of anything that broke, and what only the real phone showed you.

"I tested in Expo Go web" is not device evidence.

## Submit

Put your key source files, your `screenshot-portrait.png` and `recording.mp4` links and a **Device Notes** section in your project Notes doc. When the Verify checklist is green, submit the link to that Notes doc and press **Mark as Complete**.

<!-- claude-template-fix: readme-v3 -->

<!-- claude-template-fix: notes-migration-v1 -->
