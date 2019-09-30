export interface Language {
  id: number,
  name: string,
  nameDialect: string,
  short: string,
};

export const emptyLanguage: Language = {
  id: -1,
  name: '',
  nameDialect: '',
  short: ''
};
