export interface Lexicon {
  id?: number,
  code: string,
  category?: number,
  commentPhrase: string,
};

export const emptyLexicon: Lexicon = {
  id: undefined,
  code: '',
  category: undefined,
  commentPhrase: ''
};
