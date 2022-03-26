const genUser = () => {
  return {
    firstName: 'John',
    lastName: 'Smith',
    nickName: 'js',
    psw: '111',
    email: `john${Math.random()}@example.com`,
    userType: 1,
    emailState: 1,
    rowState: 1,
  };
};

const genSuperAdmin = () => {
  return {
    firstName: 'Super',
    lastName: 'Admin',
    nickName: 'super',
    psw: '111',
    email: `john${Math.random()}@example.com`,
    userType: 0,
    emailState: 1,
    rowState: 1,
    avatar: '',
  };
};

const genModer = () => {
  return {
    firstName: 'Moder',
    lastName: 'M',
    nickName: 'moder',
    psw: '111',
    email: `john${Math.random()}@example.com`,
    userType: 0,
    emailState: 1,
    rowState: 1,
    avatar: '',
  };
};

const genDomainAdmin = () => {
  return {
    firstName: 'Domain',
    lastName: 'Admin',
    nickName: 'domainAdmin',
    psw: '111',
    email: `john${Math.random()}@example.com`,
    userType: 0,
    emailState: 1,
    rowState: 1,
    avatar: '',
  };
};

const genDomainModer = () => {
  return {
    firstName: 'Domain',
    lastName: 'Moder',
    nickName: 'domainModer',
    psw: '111',
    email: `john${Math.random()}@example.com`,
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

const genSalone = ({domain}) => {
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

const all = (...fns) => {
  const results = []

  fns.reduce((prev, fn) => {
    fn().then(result => results.push(result))
    return results
  }, results)

  return cy.wrap(results)
}

const range = require('lodash/fp/range');
let user, admin;

const create = (cy, list) => {
  return list.map(e => {
    const r = cy.task('create', {model: e.params[0], data: e.params[1]});
    return r.then(t=> {
      return t;
    });
  });
};

const globals = {};

describe('Admin can manage admins', () => {
  before(() => {
    cy.task('dropDb');
    console.log('dropDb');
    const user = genUser();

    cy.task('createMany', [
      {
        model: 'User', data: user
      },
      {
        model: 'User', data: genSuperAdmin()
      },
      {
        model: 'User', data: genModer()
      },
      {
        model: 'User', data: genDomainAdmin()
      },
      {
        model: 'Language', data: genLang()
      },
      {
        model: 'Language', data: genLang()
      },
    ]).then(([user, superAdmin, moder, domainAdmin]) => {
      const organizer = genOrganizer();

      globals.user = user;
      globals.superAdmin = superAdmin;
      globals.moder = moder;
      globals.domainAdmin = domainAdmin;


      cy.task('createSalone', { organizer, lang: genLang(), salone: genSalone({ domain: 'foto.ru' }) }).then(({salone, organizer}) => {
        globals.salone = salone;
        globals.organizer = organizer;
        cy.task('createAdmin', {organizer, user: superAdmin, admType: 0});
        cy.task('createAdmin', {organizer, user: moder, admType: 1});
        cy.task('createAdmin', {organizer, user: domainAdmin, admType: 1000});
      });
    })
  });

  // it('Admin can create admin', () => {
  //   const {superAdmin, organizer, salone, user} = globals;

  //   cy.visit('https://foto.ru:3000')
  //   cy.get('.login-link').click();
  //   cy.get('[data-cy=nickName]').type(superAdmin.nickName);
  //   cy.get('[data-cy=password]').type(superAdmin.psw);
  //   cy.get('[data-cy=loginButton]').click();
  //   cy.visit('https://foto.ru:3000/admin/admins')

  //   // Create admin
  //   cy.get('[data-cy=addButton]').click();
  //   cy.get('#organizerId').click();
  //   cy.get(`[aria-label=${organizer.name}]`).click();
  //   cy.get('#userId').click();
  //   cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
  //   cy.get('#admType').click();
  //   cy.get('[aria-label="admin"]').click();
  //   cy.get('[type="submit"]').click();

  //   // Create moder
  //   cy.get('[data-cy=addButton]').click();
  //   cy.get('#organizerId').click();
  //   cy.get(`[aria-label=${organizer.name}]`).click();
  //   cy.get('#userId').click();
  //   cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
  //   cy.get('#admType').click();
  //   cy.get('[aria-label="moder"]').click();
  //   cy.get('[type="submit"]').click();
  // });


  // it('Moder can create moder but cannot create admin', () => {
  //   const {superAdmin, organizer, salone, user, moder} = globals;
  //   console.log(globals)

  //   cy.visit('https://foto.ru:3000')
  //   cy.get('.login-link').click();
  //   cy.get('[data-cy=nickName]').type(moder.nickName);
  //   cy.get('[data-cy=password]').type(moder.psw);
  //   cy.get('[data-cy=loginButton]').click();
  //   cy.visit('https://foto.ru:3000/admin/admins')

  //   // Create moder
  //   cy.get('[data-cy=addButton]').click();
  //   cy.get('#organizerId').click();
  //   cy.get(`[aria-label=${organizer.name}]`).click();
  //   cy.get('#userId').click();
  //   cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
  //   cy.get('#admType').click();
  //   cy.get('[aria-label="moder"]').should('exist');
  //   cy.get('[aria-label="moder"]').click();
  //   cy.get('[type="submit"]').click();

  //   // Create admin
  //   cy.get('[data-cy=addButton]').click();
  //   cy.get('#organizerId').click();
  //   cy.get(`[aria-label=${organizer.name}]`).click();
  //   cy.get('#userId').click();
  //   cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
  //   cy.get('#admType').click();
  //   cy.get('[aria-label="admin"]').should('not.exist');

  // });


  it('Domain Moder can create moder but cannot create admin', () => {
    const {superAdmin, organizer, salone, user, moder, domainAdmin} = globals;
    console.log(globals)

    cy.visit('https://foto.ru:3000')
    cy.get('.login-link').click();
    cy.get('[data-cy=nickName]').type(domainAdmin.nickName);
    cy.get('[data-cy=password]').type(domainAdmin.psw);
    cy.get('[data-cy=loginButton]').click();
    cy.visit('https://foto.ru:3000/admin/admins')

    // Create moder
    cy.get('[data-cy=addButton]').click();
    cy.get('#organizerId').click();
    cy.get(`[aria-label=${organizer.name}]`).click();
    cy.get('#userId').click();
    cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    cy.get('#admType').click();
    cy.get('[aria-label="moder"]').should('not.exist');

    // Create admin
    cy.get('[data-cy=addButton]').click();
    cy.get('#organizerId').click();
    cy.get(`[aria-label=${organizer.name}]`).click();
    cy.get('#userId').click();
    cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    cy.get('#admType').click();
    cy.get('[aria-label="admin"]').should('not.exist');

  });



})



// cy.get('.admin-menu.p-menuitem--enabled', {timeout: 3000}).click();
// cy.visit('https://foto.ru:3000/admin/admins')
// cy.get('[data-cy=addButton]').click();
