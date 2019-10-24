export interface Award {
  id?: number,
  name?: string,
  img?: string
};

export const emptyAward: Award = {
  id: undefined,
  name: undefined,
  img: undefined
};
