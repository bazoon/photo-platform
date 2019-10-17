export interface Photowork {
  id: number,
  name?: string,
  filename?: string,
  moder: number,
  rate?: number,
  average?: number,
  median?: number
};

export const emptyPhotowork: Photowork = {
  id: -1,
  name: '',
  filename: '',
  moder: 0,
  rate: undefined,
  average: undefined,
  median: undefined
};
