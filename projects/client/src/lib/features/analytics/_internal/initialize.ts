// Import the functions you need from the SDKs you need
import { ClientEnvironment } from '$lib/requests/ClientEnvironment.ts';
import type { AnalyticsEngine } from './AnalyticsEngine.ts';
import type { FirebaseEvent } from './FirebaseEvent.ts';

function sendFirebaseEvent(event: FirebaseEvent) {
  return fetch(ClientEnvironment.analytics, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function getClientId(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const storageKey = 'firebase-analytics-client-id';
  // TODO: generate on server and set as cookie
  const clientId = localStorage.getItem(storageKey) ?? crypto.randomUUID();
  localStorage.setItem(storageKey, clientId);

  return clientId;
}

// Initialize Analytics
export const initialize = (): AnalyticsEngine => {
  const clientId = getClientId();
  let userId: string | Nil = null;

  return {
    // TODO: better even type definitions
    record: (key: string, data: Record<string, string | number | Date>) => {
      sendFirebaseEvent({
        name: key,
        clientId,
        params: data,
        userId,
      });
    },
    setUserId: (id: string | Nil) => {
      userId = id;
    },
  };
};
