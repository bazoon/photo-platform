export interface ContestJury {
  id?: number;
  userId?: number;
  user: string;
}

export const emptyContestJury: ContestJury = {
  id: undefined,
  userId: undefined,
  user: ''
};
