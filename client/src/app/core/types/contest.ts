export interface Contest {
  id?: number,
  saloneId?: number,
  salone: string,
  subname: string,
  years: string,
  dateStart?: Date,
  dateStop?: Date,
  dateJuriEnd?: Date,
  dateRateShow?: Date,
  showType?: number,
  showRateState?: number,
  democraty?: number,
  payType?: number,
  sectionCount?: number,
  maxrate?: number,
  maxsize?: number,
  maxWeight?: number
};

export const emptyContest: Contest = {
  id: undefined,
  saloneId: undefined,
  salone: '',
  subname: '',
  years: '',
  dateStart: undefined,
  dateStop: undefined,
  dateJuriEnd: undefined,
  dateRateShow: undefined,
  showType: undefined,
  showRateState: undefined,
  democraty: undefined,
  payType: undefined,
  sectionCount: undefined,
  maxrate: undefined,
  maxsize: undefined,
  maxWeight: undefined
};
