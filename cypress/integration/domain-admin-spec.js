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


describe('Domain admin', () => {
  before(() => {
    cy.task('dropDb');
    const user = genUser({email: 'one'});
    const user1 = genUser({email: 'two'});
    
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
      globals.domainModer = domainModer;
      globals.domainAdmin = domainAdmin;

      cy.task('createContest', {
        organizer,
        lang: genLang(),
        salone: genSalone({domain: 'foto.ru'}),
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

    cy.task('createMany', [
      {
        model: 'User',
        data: user1,
      },
      {
        model: 'User',
        data: genDomainAdmin(),
      },
      {
        model: 'User',
        data: genDomainModer(),       
      },
    ]).then(([user, domainAdmin, domainModer]) => {
      const organizer = genOrganizer();

      globals.userOutside = user;
      globals.domainModerOutside = domainModer;
      globals.domainAdminOutside = domainAdmin;

      cy.task('createContest', {
        organizer,
        lang: genLang(),
        salone: genSalone(),
        contest: genContest(),
      }).then(({ salone, organizer, contest }) => {
        globals.saloneOutside = salone;
        globals.organizerOutside = organizer;
        globals.contestOutside = contest;

        cy.task('createAdmin', { organizer, user: domainAdmin, admType: 1000 });
        cy.task('createAdmin', { organizer, user: domainModer, admType: 1010 });
      });
    });

  });
  
  it('Can not choose admin', () => {
    const { superAdmin, domainAdmin, moder, domainModer } = globals;
  
    cy.visit('https://foto.ru:3000');
    cy.get('.login-link').click();
    cy.get('[data-cy=nickName]').type(domainAdmin.nickName);
    cy.get('[data-cy=password]').type(domainAdmin.psw);
    cy.get('[data-cy=loginButton]').click();
    cy.visit('https://foto.ru:3000/admin/admins');

    cy.get('table[role=grid]').should(p => {
      expect(p).to.not.contain(superAdmin.id);
      expect(p).to.not.contain(moder.id);
      expect(p).to.not.contain(domainAdmin.id);
      expect(p).to.contain(domainModer.id);
    });
  });

  it('Can not create admins and moders', () => {
    const { superAdmin, organizer, salone, domainAdmin, user } = globals;

    // cy.visit('https://foto.ru:3000');
    // cy.get('.login-link').click();
    // cy.get('[data-cy=nickName]').type(domainAdmin.nickName);
    // cy.get('[data-cy=password]').type(domainAdmin.psw);
    // cy.get('[data-cy=loginButton]').click();
    // cy.visit('https://foto.ru:3000/admin/admins');

    // Create admin
    cy.get('[data-cy=addButton]').click();
    cy.get('#organizerId').click();
    cy.get(`[aria-label=${organizer.name}]`).click();
    cy.get('#userId').click();
    cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    cy.get('#admType').click();
    cy.get('[aria-label="admin"]').should('not.exist');
    cy.get('[data-cy=cancel]').click();

    // Create moder
    cy.get('[data-cy=addButton]').click();
    cy.get('#organizerId').click();
    cy.get(`[aria-label=${organizer.name}]`).click();
    cy.get('#userId').click();
    cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    cy.get('#admType').click();
    cy.get('[aria-label="moder"]').should('not.exist');
    cy.get('[data-cy=cancel]').click();

    // Create domainAdmin
    cy.get('[data-cy=addButton]').click();
    cy.get('#organizerId').click();
    cy.get(`[aria-label=${organizer.name}]`).click();
    cy.get('#userId').click();
    cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    cy.get('#admType').click();
    cy.get('[aria-label="domainAdmin"]').should('not.exist');
    cy.get('[data-cy=cancel]').click();

    // Create domainModer
    cy.get('[data-cy=addButton]').click();
    cy.get('#organizerId').click();
    cy.get(`[aria-label=${organizer.name}]`).click();
    cy.get('#userId').click();
    cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    cy.get('#admType').click();
    cy.get('[aria-label="domainModer"]').should('exist');
    cy.get('[data-cy=cancel]').click();

  });


  it('Can assign jury', () => {
    const { superAdmin, organizer, salone, domainAdmin, user } = globals;

    cy.visit('https://foto.ru:3000');
    cy.get('.login-link').click();
    cy.get('[data-cy=nickName]').type(domainAdmin.nickName);
    cy.get('[data-cy=password]').type(domainAdmin.psw);
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
    const { superAdmin, organizer, salone, domainAdmin, user } = globals;
    cy.visit('https://foto.ru:3000');
    cy.get('.login-link').click();
    cy.get('[data-cy=nickName]').type(domainAdmin.nickName);
    cy.get('[data-cy=password]').type(domainAdmin.psw);
    cy.get('[data-cy=loginButton]').click();
    cy.visit('https://foto.ru:3000/admin/salones');
    cy.get('[data-cy=addButton]').should('be.disabled');
  });


  it.only('On create moder he can not select salones from outside his salone', () => {
    const { superAdmin, organizer, salone, domainAdmin, user } = globals;

    cy.visit('https://foto.ru:3000');
    cy.get('.login-link').click();
    cy.get('[data-cy=nickName]').type(domainAdmin.nickName);
    cy.get('[data-cy=password]').type(domainAdmin.psw);
    cy.get('[data-cy=loginButton]').click({timeout: 1000});
    cy.visit('https://foto.ru:3000/admin/admins');

    // Create admin
    // cy.get('[data-cy=addButton]').should('not.be.disabled');
    cy.get('[data-cy=addButton]').click({timeout: 5000});
    
    cy.get(`[aria-label=${organizer.name}]`).click();
    // cy.get('#userId').click();
    // cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    // cy.get('#admType').click();
    // cy.get('[aria-label="admin"]').should('not.exist');
    // cy.get('[data-cy=cancel]').click()

    // cy.get('table[role=grid]').should(p => {
    //   expect(p).to.contain(`${user.firstName} ${user.lastName}`)
    // });


    // cy.get(`[aria-label=${organizer.name}]`).click();
    // cy.get('#userId').click();
    // cy.get(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    // cy.get('#admType').click();
    // cy.get('[aria-label="moder"]').should('not.exist');
    // cy.get('[data-cy=cancel]').click();


  });


});

