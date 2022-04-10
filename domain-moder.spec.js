const { test, expect } = require('@playwright/test');
const {
    createAdmin,
    createContest,
    createMany,
    dropDb
} = require('./utils');

const {genUser, genSuperAdmin, genModer, genDomainAdmin, genDomainModer, genLang, genOrganizer, genSalone, genContest} = require('../cypress/integration/gens');

let globals = {};

test.beforeAll(async () => {
  await dropDb();

    const user = genUser({email: 'one'});
    const user1 = genUser({email: 'two'});
    
    await createMany([
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
    ]).then(async ([user, superAdmin, moder, domainAdmin, domainModer]) => {
      
      const organizer = genOrganizer();

      globals.user = user;
      globals.superAdmin = superAdmin;
      globals.moder = moder;
      globals.domainModer = domainModer;
      globals.domainAdmin = domainAdmin;

      await createContest({
        organizer,
        lang: genLang(),
        salone: genSalone({domain: 'foto.ru'}),
        contest: genContest(),
      }).then(async ({ salone, organizer, contest }) => {
        globals.salone = salone;
        globals.organizer = organizer;
        globals.contest = contest;

        await createAdmin({ organizer, user: superAdmin, admType: 0 });
        await createAdmin({ organizer, user: moder, admType: 1 });
        await createAdmin({ organizer, user: domainAdmin, admType: 1000 });
        await createAdmin({ organizer, user: domainModer, admType: 1010 });
      });
    });

    await createMany([
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
    ]).then(async ([user, domainAdmin, domainModer]) => {
      const organizer = genOrganizer();

      globals.userOutside = user;
      globals.domainModerOutside = domainModer;
      globals.domainAdminOutside = domainAdmin;

      await createContest({
        organizer,
        lang: genLang(),
        salone: genSalone(),
        contest: genContest(),
      }).then(async ({ salone, organizer, contest }) => {
        globals.saloneOutside = salone;
        globals.organizerOutside = organizer;
        globals.contestOutside = contest;

        await createAdmin({ organizer, user: domainAdmin, admType: 1000 });
        await createAdmin({ organizer, user: domainModer, admType: 1010 });
      });
    });
});

  const login = async (page) => {
    const { domainAdmin } = globals;

    await page.goto('https://foto.ru:3000');
    await page.locator('.login-link').click();
    await page.locator('[data-cy=nickName]').type(domainAdmin.nickName);
    await page.locator('[data-cy=password]').type(domainAdmin.psw);
    await page.locator('[data-cy=loginButton]').click();
  };

test.describe('New Todo', () => {
  test('Can can choose only moder', async ({page}) => {
    const { superAdmin, domainAdmin, moder, domainModer } = globals;
    await login(page); 

    await page.click('text=admin', {delay: 100});
    await page.click('text=users');
    await page.click('text=admins');

    await expect(page.locator('table[role=grid]')).toHaveCount(1);

    await expect(page.locator('table[role=grid]')).not.toContainText(superAdmin.id.toString());
    await expect(page.locator('table[role=grid]')).not.toContainText(moder.id.toString());
    await expect(page.locator('table[role=grid]')).not.toContainText(domainAdmin.id.toString());
    await expect(page.locator('table[role=grid]')).toContainText(domainModer.id.toString());
  });

  test('Can create domainModer only', async ({page}) => {
    const {organizer, user} = globals;

    await login(page);
    await page.click('text=admin', {delay: 100});
    await page.click('text=users');
    await page.click('text=admins');


    await page.locator('[data-cy=addButton]').click();
    await page.locator('#organizerId').click();
    await page.locator(`[aria-label=${organizer.name}]`).click();
    await page.locator('#userId').click();
    await page.locator(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    await page.locator('#admType').click();
    await expect(page.locator('[aria-label="admin"]')).toHaveCount(0);
    await page.locator('[data-cy=cancel]').click();

    await page.locator('[data-cy=addButton]').click();
    await page.locator('#organizerId').click();
    await page.locator(`[aria-label=${organizer.name}]`).click();
    await page.locator('#userId').click();
    await page.locator(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    await page.locator('#admType').click();
    await expect(page.locator('[aria-label="moder"]')).toHaveCount(0);
    await page.locator('[data-cy=cancel]').click();

    await page.locator('[data-cy=addButton]').click();
    await page.locator('#organizerId').click();
    await page.locator(`[aria-label=${organizer.name}]`).click();
    await page.locator('#userId').click();
    await page.locator(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    await page.locator('#admType').click();
    await expect(page.locator('[aria-label="domainAdmin"]')).toHaveCount(0);
    await page.locator('[data-cy=cancel]').click();

    await page.locator('[data-cy=addButton]').click();
    await page.locator('#organizerId').click();
    await page.locator(`[aria-label=${organizer.name}]`).click();
    await page.locator('#userId').click();
    await page.locator(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    await page.locator('#admType').click();
    await expect(page.locator('[aria-label="domainModer"]')).toHaveCount(1);
    await page.locator('[data-cy=cancel]').click();
  });


  test('Can assign jury', async ({ page }) => {
    const { user } = globals;
    await login(page);
    await page.click('text=admin', {delay: 100});
    await page.click('text=organization');
    await page.click('text=contests');

    await page.locator('.p-row-toggler').click();
    await page.locator('.p-row-toggler').click();
    await page.locator('.p-row-toggler').click();
    await page.locator('[data-cy=jury]').click();

    await page.locator('.p-dialog [data-cy=addButton]').click();
    await page.locator('#userId').click();
    await page.locator(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    await page.locator('[type="submit"]').click();
    await expect(page.locator('.p-dialog table[role=grid]')).toContainText(`${user.firstName} ${user.lastName}`);
  });


  test('Can can not select organizer from other domain', async ({page}) => {
    const { domainAdmin, moder, organizerOutside } = globals;
    await login(page); 

    await page.click('text=admin', {delay: 100});
    await page.click('text=users');
    await page.click('text=admins');


    await page.locator('[data-cy=addButton]').click();
    await page.locator('#organizerId').click();
    console.log(organizerOutside.name)
    // await page.pause('')

    await expect(page.locator('.p-dropdown-items')).not.toContainText(`${organizerOutside.name}`);
  });



});
