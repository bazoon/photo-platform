export interface Phrase {
  id?: number,
  lexiconId?: number,
  languageId?: number,
  name: string
};

export const emptyPhrase: Phrase = {
  languageId: undefined,
  name: ''
};
