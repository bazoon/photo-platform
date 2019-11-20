export interface PublicationText {
  id?: number;
  languageId?: number;
  language: string;
  name: string;
  content: string;
  digest: string;
}

export const emptyPublicationText: PublicationText = {
  id: undefined,
  languageId: undefined,
  language: '',
  name: '',
  content: '',
  digest: ''
};
