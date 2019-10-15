export interface Photowork {
  id: number,
  name?: string,
  filename?: string,
  moder: number
};

export const emptyPhotowork: Photowork = {
  id: -1,
  name: '',
  filename: '',
  moder: 0
};
