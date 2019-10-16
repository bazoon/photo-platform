export interface Photowork {
  id: number,
  name?: string,
  filename?: string,
  moder: number,
  rate?: number
};

export const emptyPhotowork: Photowork = {
  id: -1,
  name: '',
  filename: '',
  moder: 0,
  rate: undefined
};
