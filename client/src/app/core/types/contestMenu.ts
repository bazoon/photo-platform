export interface ContestMenu {
  id?: number,
  contestId?: number,
  position?: number,
  parentId?: number,
  lexiconId?: number,
  code?: string
};

export const emptyContestMenu: ContestMenu = {
  id: undefined,
  contestId: undefined,
  position: undefined,
  parentId: undefined,
  lexiconId: undefined,
  code: ''
};
