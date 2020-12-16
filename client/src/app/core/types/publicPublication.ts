export interface PublicPublication {
  id?: number,
  dateCreate?: Date,
  dateShow?: Date,
  visible?: number,
  digest: string,
  content: string,
  name: string,
  pubtype?: number
};

export const emptyPublicPublication: PublicPublication = {
  id: undefined,
  dateCreate: undefined,
  dateShow: undefined,
  visible: undefined,
  digest: '',
  content: '',
  name: '',
};
