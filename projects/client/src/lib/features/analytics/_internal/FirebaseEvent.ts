export type FirebaseEvent = {
  name: string;
  clientId: string;
  params?: Record<string, unknown>;
  userId?: string | Nil;
};
