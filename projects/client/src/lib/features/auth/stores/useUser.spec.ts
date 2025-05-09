import { ExtendedUserMappedMock } from '$mocks/data/users/mapped/ExtendedUserSettingsMappedMock.ts';
import { UserRatedMappedMock } from '$mocks/data/users/mapped/UserRatedMappedMock.ts';
import { runQuery } from '$test/beds/query/runQuery.ts';
import { setAuthorization } from '$test/beds/store/renderStore.ts';
import { beforeEach, describe, expect, it } from 'vitest';
import { useUser } from './useUser.ts';

describe('store: useUser', () => {
  beforeEach(() => {
    setAuthorization(true);
  });

  it('should contain the user profile', async () => {
    const result = await runQuery({
      factory: () => useUser().user,
    });

    expect(result).to.deep.equal(ExtendedUserMappedMock);
  });

  it('should contain the user ratings', async () => {
    const result = await runQuery({
      factory: () => useUser().ratings,
    });

    expect(result).to.deep.equal(UserRatedMappedMock);
  });
});
