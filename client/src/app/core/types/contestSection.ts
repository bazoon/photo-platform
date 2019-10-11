export interface ContestSection {
  id?: number,
  contestId?: number,
  maxCountImg?: number,
  name: string
};

export const emptyContestSection: ContestSection = {
  id: undefined,
  contestId: undefined,
  maxCountImg: undefined,
  name: ''
};
