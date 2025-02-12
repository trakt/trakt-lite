import z from 'zod';

export const UserProfileSchema = z.object({
  username: z.string(),
  name: z.string(),
  private: z.boolean(),
  isVip: z.boolean(),
  slug: z.string(),
  avatar: z.object({
    url: z.string(),
  }),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;
