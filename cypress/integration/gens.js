const random = () => Math.random().toString().slice(0, 5);

export const genUser = () => {
  return {
    firstName: 'John',
    lastName: 'Smith',
    nickName: 'js' + random(),
    psw: '111',
    email: `john${Math.random()}@example.com`,
    userType: 1,
    emailState: 1,
    rowState: 1,
  };
};

export const genSuperAdmin = () => {
  return {
    firstName: 'Super',
    lastName: 'Admin',
    nickName: 'super' + random(),
    psw: '111',
    email: `john${Math.random()}@example.com`,
    userType: 0,
    emailState: 1,
    rowState: 1,
    avatar: '',
  };
};

export const genModer = () => {
  return {
    firstName: 'Moder',
    lastName: 'M',
    nickName: 'moder' + random(),
    psw: '111',
    email: `john${Math.random()}@example.com`,
    userType: 0,
    emailState: 1,
    rowState: 1,
    avatar: '',
  };
};

export const genDomainAdmin = () => {
  return {
    firstName: 'Domain',
    lastName: 'Admin',
    nickName: 'domainAdmin' + random(),
    psw: '111',
    email: `john${Math.random()}@example.com`,
    userType: 0,
    emailState: 1,
    rowState: 1,
    avatar: '',
  };
};

export const genDomainModer = () => {
  return {
    firstName: 'Domain',
    lastName: 'Moder',
    nickName: 'domainModer' + random(),
    psw: '111',
    email: `john${Math.random()}@example.com`,
    userType: 0,
    emailState: 1,
    rowState: 1,
    avatar: '',
  };
};

export const genLang = () => {
  return {
    name: 'Russian',
    short: 'ru'
  };
}

export const genOrganizer = () => {
  return {
    name: 'Organizer1',
    emailSys: 'a@a.com',
    emailPub: 'b@a.com',
    virtual: 1,
    smtpUsePub: 0,
    dateCreate: new Date(),
    rowState: 1,
    userType: 0,
    emailState: 1,
    dateStatus: new Date()
  };
};

export const genSalone = ({domain}) => {
  return {
    sprSaloneTypeId: 0,
    name: `salone-${Math.random()}`,
    regular: 1,
    private: 0,
    domain,
    designCode: 0,
    rowState: 1,
    slug: domain
  };
};

export const genContest = () => {
  return {
    subname: `contest-${Math.random()}`,
    dateStart: new Date(),
    dateStop: new Date(),
    dateJuriEnd: new Date(),
    dateRateShow: new Date(),
    showType: 0,
    showRateState: 0,
    democraty: 0,
    maxCountImg: 10,
    inworknow: true
  };
};



