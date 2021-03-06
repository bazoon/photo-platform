export interface Organizer {
  id: number;
  languageId: number;
  language: string;
  name: string;
  emailSys: string;
  emailPub: string;
  addressLine1: string;
  addressLine2: string;
  www: string;
  phone: string;
  phoneTech: string;
  officer: string;
  logo: string;
  virtual: number;
  smtp: string;
  smtpPassword: string;
  smtpUsePub: number;
  createdAt?: Date;
  rowState: number;
  dateStatus?: Date;
}

export const emptyOrganizer: Organizer = {
  id: -1,
  languageId: -1,
  language: '',
  name: '',
  emailSys: '',
  emailPub: '',
  addressLine1: '',
  addressLine2: '',
  www: '',
  phone: '',
  phoneTech: '',
  officer: '',
  logo: '',
  virtual: -1,
  smtp: '',
  smtpPassword: '',
  smtpUsePub: -1,
  createdAt: undefined,
  rowState: -1,
  dateStatus: undefined
};
