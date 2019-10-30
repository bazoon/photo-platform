export interface Award {
  id?: number;
  name?: string;
  img?: string;
}

export const emptyAward: Award = {
  id: undefined,
  img: undefined,
  name: undefined
};
