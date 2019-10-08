export interface Lexicon {
  id?: number,
  languageId?: number,
  code: string,
  name: string,
  category?: number
};

export const emptyLexicon: Lexicon = {
  id: undefined,
  languageId: undefined,
  code: '',
  name: '',
  category: undefined
};
