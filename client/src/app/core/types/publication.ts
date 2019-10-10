export interface Publication {
  id?: number,
  contestMenuId?: number,
  dateCreate?: Date,
  dateShow?: Date,
  visible?: number,
  pubtype?: number,
  archive?: number
};

export const emptyPublication: Publication = {
  id: undefined,
  contestMenuId: undefined,
  dateCreate: undefined,
  dateShow: undefined,
  visible: undefined,
  pubtype: undefined,
  archive: undefined
};
