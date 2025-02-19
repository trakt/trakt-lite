import { setupServer } from 'msw/node';
import { auth } from './handlers/auth.ts';
import { calendars } from './handlers/calendars.ts';
import { episodes } from './handlers/episodes.ts';
import { movies } from './handlers/movies.ts';
import { people } from './handlers/people.ts';
import { recommendations } from './handlers/recommendations.ts';
import { search } from './handlers/search.ts';
import { shows } from './handlers/shows.ts';
import { sync } from './handlers/sync.ts';
import { users } from './handlers/users.ts';
import { watchNow } from './handlers/watchNow.ts';

const handlers = [
  ...users,
  ...movies,
  ...shows,
  ...episodes,
  ...sync,
  ...auth,
  ...people,
  ...watchNow,
  ...recommendations,
  ...calendars,
  ...search,
];

export const server = setupServer(...handlers);
