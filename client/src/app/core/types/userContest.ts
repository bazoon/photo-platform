export interface UserContest {
  id?: number,
  salone: string,
  subname: string,
  dateStart?: Date,
  dateStop?: Date,
  regState?: number,
  canApply: boolean,
  canPostPhotos: boolean,
  sectionCount?: number
};

export const emptyUserContest: UserContest = {
  id: undefined,
  salone: '',
  subname: '',
  dateStart: undefined,
  dateStop: undefined,
  regState: undefined,
  canApply: false,
  canPostPhotos: false,
  sectionCount: undefined
};
