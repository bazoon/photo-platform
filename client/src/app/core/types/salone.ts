export interface Salone {
  id?: number,
  sprSaloneTypeId?: number,
  saloneType: string,
  organizerId?: number,
  organizer: string,
  name: string,
  regular: number,
  domain: string,
  designCode: string,
  rowState: string,
  private: number
};

export const emptySalone: Salone = {
  id: undefined,
  sprSaloneTypeId: undefined,
  saloneType: '',
  organizerId: undefined,
  organizer: '',
  name: '',
  regular: -1,
  domain: '',
  designCode: '',
  rowState: '',
  private: -1
};
