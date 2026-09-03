'use client';

import { useEffect } from 'react';
import { BASE_PATH } from '@/lib/base-path';

/**
 * Registrerar service workern efter att sidan har laddat.
 *
 * Bara i produktionsbygget — en service worker som cachar under
 * `next dev` gör att kodändringar inte syns, vilket är en klassisk källa
 * till förvirring. `next dev` sätter aldrig NODE_ENV till "production".
 *
 * En misslyckad registrering (t.ex. äldre webbläsare, eller sw.js som av
 * någon anledning saknas) får aldrig krascha appen — bara loggas.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register(`${BASE_PATH}/sw.js`, { scope: `${BASE_PATH}/` }).catch((error) => {
        console.error('Kunde inte registrera service worker:', error);
      });
    };

    if (document.readyState === 'complete') {
      register();
    } else {
      window.addEventListener('load', register, { once: true });
      return () => window.removeEventListener('load', register);
    }
  }, []);

  return null;
}
