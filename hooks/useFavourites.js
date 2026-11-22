import { useCallback, useEffect, useState } from 'react';
import { findLibrary } from '../lib/libraries';
import { loadFavourites, toggleFavourite } from '../lib/favourites';
import { syncGeofences } from '../lib/geofence';
import { askAlertPermissions } from '../lib/permissions';

// Provided: ties the favourites list to the arrival alerts. Saving a library asks for the alert
// permissions (once, with reasons) and watches it; removing one stops watching it.
// The library is saved even when the alerts are refused, and `notice` says why they are off.
export function useFavourites() {
  const [ids, setIds] = useState([]);
  const [notice, setNotice] = useState(null);

  const reload = useCallback(() => loadFavourites().then(setIds), []);
  useEffect(() => {
    reload();
  }, [reload]);

  const toggle = useCallback(
    async (id) => {
      const adding = !ids.includes(id);
      let alertsOk = true;
      if (adding) {
        const result = await askAlertPermissions();
        alertsOk = result.ok;
        setNotice(result.ok ? null : result.reason);
      }
      const next = await toggleFavourite(id);
      setIds(next);
      if (alertsOk) {
        try {
          await syncGeofences(next.map(findLibrary).filter(Boolean));
        } catch (error) {
          setNotice(`Arrival alerts could not start: ${error.message}`);
        }
      }
    },
    [ids]
  );

  return { ids, toggle, reload, notice };
}
