export interface ContestAbout {
  id?: number;
  languageId?: number;
  language: string;
  contestId?: number;
  name: string;
  thesis: string;
  rules: string;
}


export const emptyContestAbout: ContestAbout = {
  id: undefined,
  languageId: undefined,
  language: '',
  contestId: undefined,
  name: '',
  thesis: '',
  rules: ''
};
