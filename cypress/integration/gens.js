const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function rndString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const genDate = () => {
  return (new Date()).toUTCString();
};

const casual = {
  get first_name() {
    return 'first_name' + rndString(8);
  },
  get last_name() {
    return 'last_name' + rndString(8);
  },
  get domain_first_name() {
    return 'domain_first_name' + rndString(4);
  },
  get domain_last_name() {
    return 'domain_last_name' + rndString(4);
  },
  get domain_username() {
    return 'domain_username' + rndString(4);
  },
  get username() {
    return 'nickname' + rndString(8);
  },
  get domain() {
    return 'domain' + rndString(8);
  },
  get salone_name() {
    return 'salone_name' + rndString(8);
  },
  get email() {
    return 'email' + rndString(8);
  },
  get name() {
    return 'name' + rndString(8);
  },
};

const genUser = ({email}) => {
  return {
    firstName: casual.first_name,
    lastName: casual.last_name,
    nickName: casual.username,
    psw: '111',
    email: email || casual.email,
    userType: 1,
    emailState: 1,
    rowState: 1,
  };
};

const genSuperAdmin = () => {
  return {
    firstName: 'SA-' + casual.first_name,
    lastName: casual.last_name,
    nickName: casual.username,
    psw: '111',
    email: casual.email,
    userType: 0,
    emailState: 1,
    rowState: 1,
    avatar: '',
  };
};

const genModer = () => {
  return {
    firstName: 'MO-' + casual.first_name,
    lastName: casual.last_name,
    nickName: casual.username,
    psw: '111',
    email: casual.email,
    userType: 0,
    emailState: 1,
    rowState: 1,
    avatar: '',
  };
};

const genDomainAdmin = () => {
  return {
    firstName: 'DA-' + casual.domain_first_name,
    lastName: casual.domain_last_name,
    nickName: casual.domain_username,
    psw: '111',
    email: casual.email,
    userType: 0,
    emailState: 1,
    rowState: 1,
    avatar: '',
  };
};

const genDomainModer = () => {
  return {
    firstName: 'DM-'+casual.domain_first_name + '-M',
    lastName: casual.last_name,
    nickName: casual.username,
    psw: '111',
    email: casual.email,
    userType: 0,
    emailState: 1,
    rowState: 1,
    avatar: '',
  };
};

const genLang = () => {
  return {
    name: 'Russian',
    short: 'ru'
  };
}
const genOrganizer = () => {
  return {
    name: casual.name,
    emailSys: casual.email,
    emailPub: casual.email,
    virtual: 1,
    smtpUsePub: 0,
    dateCreate: genDate(),
    rowState: 1,
    userType: 0,
    emailState: 1,
    dateStatus: genDate()
  };
};

const genSalone = (p) => {
  const domain = p && p.domain || casual.domain;
  return {
    sprSaloneTypeId: 0,
    name: casual.salone_name,
    regular: 1,
    private: 0,
    domain,
    designCode: 0,
    rowState: 1,
    slug: domain
  };
};

const genContest = () => {
  return {
    subname: casual.name,
    dateStart: genDate(),
    dateStop: genDate(),
    dateJuriEnd: genDate(),
    dateRateShow: genDate(),
    showType: 0,
    showRateState: 0,
    democraty: 0,
    maxCountImg: 10,
    inworknow: true
  };
};


const genSettings = ({levelable}) => {
  return {
    code: casual.name,
    levelable,
    enable: true,
    type_set: 'string'
  };
};

module.exports = {
  genUser,
  genSuperAdmin, 
  genModer, 
  genDomainAdmin,
  genDomainModer,
  genLang, 
  genOrganizer, 
  genSalone, 
  genContest,
  genSettings
};





