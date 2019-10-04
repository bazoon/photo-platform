export interface SaloneAbout {
  id?: number,
  languageId?: number,
  language: string,
  saloneId?: number,
  name: string,
  content: string
};

export const emptySaloneAbout: SaloneAbout = {
  id: undefined,
  languageId: undefined,
  language: '',
  saloneId: undefined,
  name: '',
  content: ''
};
