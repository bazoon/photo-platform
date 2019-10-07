export interface ContestMenu {
  id?: number,
  contestId?: number,
  position?: number,
  parentId?: number
};

export const emptyContestMenu: ContestMenu = {
  id: undefined,
  contestId: undefined,
  position: undefined,
  parentId: undefined
};
