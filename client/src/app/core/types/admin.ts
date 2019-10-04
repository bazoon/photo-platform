export interface Admin {
  organizerId?: number,
  userId?: number,
  admType?: number,
  user: string,
  organizer: string,
};

export const emptyAdmin: Admin = {
  organizerId: undefined,
  userId: undefined,
  admType: undefined,
  organizer: '',
  user: ''
};
