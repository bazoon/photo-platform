export interface AwardType {
  id?: number;
  name?: string;
  img?: string;
}

export const emptyAwardType: AwardType = {
  id: undefined,
  img: undefined,
  name: undefined
};
