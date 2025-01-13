import { FIREBASE_MEASUREMENT_ID } from '$env/static/private';
import { ClientEnvironment } from '$lib/requests/ClientEnvironment';
import type { Handle } from '@sveltejs/kit';
import type { FirebaseEvent } from './_internal/FirebaseEvent';

const FIREBASE_MEASUREMENT_ENDPOINT =
  'https://www.google-analytics.com/collect';

function sendToFirebase(event: FirebaseEvent) {
  const { name, params, userId, clientId } = event;

  return fetch(
    `${FIREBASE_MEASUREMENT_ENDPOINT}?measurement_id=${FIREBASE_MEASUREMENT_ID}`,
    {
      method: 'POST',
      body: JSON.stringify({
        client_id: clientId,
        user_id: userId,
        events: [{
          name,
          ...params,
        }],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname === ClientEnvironment.analytics) {
    if (event.request.method === 'POST') {
      try {
        const body = await event.request.json() as FirebaseEvent;
        console.log('Logging event:', body);
        if (!body?.name || !body?.clientId) {
          return new Response('Invalid event data', { status: 400 });
        }

        await sendToFirebase(body);
        return new Response('Event logged successfully', { status: 200 });
      } catch (error) {
        console.error('Error logging event:', error);
        return new Response('Error logging event', { status: 500 });
      }
    }
    return new Response('Method not allowed', { status: 405 });
  }

  return resolve(event);
};
