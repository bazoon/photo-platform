export interface ContestRegistration {
  id?: number,
  userId?: number,
  contestId?: number,
  contest?: string,
  dateReg?: Date,
  sectionCount?: number,
  regState?: number,
  rejectionReason?: string,
  payment?: number
};

export const emptyContestRegistration: ContestRegistration = {
  id: undefined,
  userId: undefined,
  contestId: undefined,
  contest: '',
  dateReg: undefined,
  sectionCount: undefined,
  regState: undefined,
  rejectionReason: '',
  payment: undefined
};
