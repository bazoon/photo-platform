export interface Photowork {
  id?: number,
  name?: string,
  filename?: string
};

export const emptyPhotowork: Photowork = {
  id: undefined,
  name: '',
  filename: ''
};
