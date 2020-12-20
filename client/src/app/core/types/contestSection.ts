export interface ContestSection {
  id?: number;
  contestId?: number;
  maxCountImg?: number;
  name: string;
  canChange: boolean,
  maxWeight?: number
}

export const emptyContestSection: ContestSection = {
  id: undefined,
  contestId: undefined,
  maxCountImg: undefined,
  name: '',
  canChange: false,
  maxWeight: 0
};
