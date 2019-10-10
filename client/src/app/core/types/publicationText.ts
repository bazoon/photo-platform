export interface PublicationText {
  id?: number,
  languageId?: number,
  name: string,
  content: string,
  digest: string
};

export const emptyPublicationText: PublicationText = {
  id: undefined,
  languageId: undefined,
  name: '',
  content: '',
  digest: ''
};
