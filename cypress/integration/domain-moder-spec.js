import {
  genUser,
  genLang,
  genModer,
  genSalone,
  genContest,
  genOrganizer,
  genSuperAdmin,
  genDomainAdmin,
  genDomainModer,
} from './gens';

const globals = {};

describe('Moder', () => {
  before(() => {
    cy.task('dropDb');
    const user = genUser();

    cy.task('createMany', [
      {
        model: 'User',
        data: user,
      },
      {
        model: 'User',
        data: genSuperAdmin(),
      },
      {
        model: 'User',
        data: genModer(),
      },
      {
        model: 'User',
        data: genDomainAdmin(),
      },
      {
        model: 'User',
        data: genDomainModer(),
      },
      {
        model: 'Language',
        data: genLang(),
      },
    ]).then(([user, superAdmin, moder, domainAdmin, domainModer]) => {
      const organizer = genOrganizer();

      globals.user = user;
      globals.superAdmin = superAdmin;
      globals.moder = moder;
      globals.domainAdmin = domainAdmin;
      globals.domainModer = domainModer;

      cy.task('createContest', {
        organizer,
        lang: genLang(),
        salone: genSalone({ domain: 'foto.ru' }),
        contest: genContest(),
      }).then(({ salone, organizer, contest }) => {
        globals.salone = salone;
        globals.organizer = organizer;
        globals.contest = contest;

        cy.task('createAdmin', { organizer, user: superAdmin, admType: 0 });
        cy.task('createAdmin', { organizer, user: moder, admType: 1 });
        cy.task('createAdmin', { organizer, user: domainAdmin, admType: 1000 });
        cy.task('createAdmin', { organizer, user: domainModer, admType: 1010 });
      });
    });
  });

  it('Can create moder but cannot create admin', () => {
    const { superAdmin, organizer, salone, user, moder } = globals;

    cy.visit('https://foto.ru:3000');
    cy.get('.login-link').click();
    cy.get('[data-cy=nickName]').type(moder.nickName);
    cy.get('[data-cy=password]').type(moder.psw);
    cy.get('[data-cy=loginButton]').click();
    cy.visit('https://foto.ru:3000/admin/admins');

    // Create moder
    cy.get('[data-cy=addButton]').click();
    cy.get('#organizerId').click();
    cy.get(`[aria-label=${organizer.name}]`).click();
    cy.get('#userId').click();
    cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    cy.get('#admType').click();
    cy.get('[aria-label="moder"]').should('exist');
    cy.get('[aria-label="moder"]').click();
    cy.get('[type="submit"]').click();

    // Create admin
    cy.get('[data-cy=addButton]').click();
    cy.get('#organizerId').click();
    cy.get(`[aria-label=${organizer.name}]`).click();
    cy.get('#userId').click();
    cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    cy.get('#admType').click();
    cy.get('[aria-label="admin"]').should('not.exist');
  });
});

describe('DomainModer', () => {
  before(() => {
    cy.task('dropDb');
    const user = genUser();

    cy.task('createMany', [
      {
        model: 'User',
        data: user,
      },
      {
        model: 'User',
        data: genSuperAdmin(),
      },
      {
        model: 'User',
        data: genModer(),
      },
      {
        model: 'User',
        data: genDomainAdmin(),
      },
      {
        model: 'User',
        data: genDomainModer(),
      },
      {
        model: 'Language',
        data: genLang(),
      },
    ]).then(([user, superAdmin, moder, domainAdmin, domainModer]) => {
      const organizer = genOrganizer();

      globals.user = user;
      globals.superAdmin = superAdmin;
      globals.moder = moder;
      globals.domainAdmin = domainAdmin;
      globals.domainModer = domainModer;

      cy.task('createContest', {
        organizer,
        lang: genLang(),
        salone: genSalone({ domain: 'foto.ru' }),
        contest: genContest(),
      }).then(({ salone, organizer, contest }) => {
        globals.salone = salone;
        globals.organizer = organizer;
        globals.contest = contest;

        cy.task('createAdmin', { organizer, user: superAdmin, admType: 0 });
        cy.task('createAdmin', { organizer, user: moder, admType: 1 });
        cy.task('createAdmin', { organizer, user: domainAdmin, admType: 1000 });
        cy.task('createAdmin', { organizer, user: domainModer, admType: 1010 });
      });
    });
  });

  it('Can not create admins and moders', () => {
    const { superAdmin, organizer, salone, domainModer, user } = globals;

    cy.visit('https://foto.ru:3000');
    cy.get('.login-link').click();
    cy.get('[data-cy=nickName]').type(domainModer.nickName);
    cy.get('[data-cy=password]').type(domainModer.psw);
    cy.get('[data-cy=loginButton]').click();
    cy.visit('https://foto.ru:3000/admin/admins');

    // Create moder
    cy.get('[data-cy=addButton]').click();
    cy.get('#organizerId').click();
    cy.get(`[aria-label=${organizer.name}]`).click();
    cy.get('#userId').click();
    cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    cy.get('#admType').click();
    cy.get('[aria-label="moder"]').should('not.exist');
    cy.get('[data-cy=cancel]').click();

    // Create admin
    cy.get('[data-cy=addButton]').click();
    cy.get('#organizerId').click();
    cy.get(`[aria-label=${organizer.name}]`).click();
    cy.get('#userId').click();
    cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    cy.get('#admType').click();
    cy.get('[aria-label="admin"]').should('not.exist');
  });


  it('Can assign jury', () => {
    const { superAdmin, organizer, salone, domainModer, user } = globals;

    cy.visit('https://foto.ru:3000');
    cy.get('.login-link').click();
    cy.get('[data-cy=nickName]').type(domainModer.nickName);
    cy.get('[data-cy=password]').type(domainModer.psw);
    cy.get('[data-cy=loginButton]').click();
    cy.visit('https://foto.ru:3000/admin/contests');

    cy.get('.p-row-toggler').click();
    cy.get('.p-row-toggler').click();
    cy.get('.p-row-toggler').click();
    cy.get('[data-cy=jury]').click();

    cy.get('.p-dialog [data-cy=addButton]').click();
    cy.get('#userId').click();
    cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    cy.get('[type="submit"]').click();
    cy.get('table[role=grid]').should(p => {
      expect(p).to.contain(`${user.firstName} ${user.lastName}`)
    });
  });


  it('Can not add salone', () => {
    const { superAdmin, organizer, salone, domainModer, user } = globals;
    cy.visit('https://foto.ru:3000');
    cy.get('.login-link').click();
    cy.get('[data-cy=nickName]').type(domainModer.nickName);
    cy.get('[data-cy=password]').type(domainModer.psw);
    cy.get('[data-cy=loginButton]').click();
    cy.visit('https://foto.ru:3000/admin/salones');
    cy.get('[data-cy=addButton]').should('be.disabled');
  });
});

