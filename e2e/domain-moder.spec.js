const { test, expect } = require('@playwright/test');
const {
    createAdmin,
    createContest,
    createMany,
    dropDb
} = require('./utils');

const {
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
} = require('../cypress/integration/gens');

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
      {
        model: 'Setting',
        data: genSettings({levelable: 0})
      },
      {
        model: 'Setting',
        data: genSettings({levelable: 1})
      },
      {
        model: 'Setting',
        data: genSettings({levelable: 2})
      },
      {
        model: 'Setting',
        data: genSettings({levelable: 3})
      }
    ]).then(async ([
      user,
      superAdmin, 
      moder,
      domainAdmin, 
      domainModer,
      language,
      setting_level0,
      setting_level1,
      setting_level2,
      setting_level3,
    ]) => {
      
      const organizer = genOrganizer();

      globals.user = user;
      globals.superAdmin = superAdmin;
      globals.moder = moder;
      globals.domainModer = domainModer;
      globals.domainAdmin = domainAdmin;


      globals.setting_level0 = setting_level0;
      globals.setting_level1 = setting_level1;
      globals.setting_level2 = setting_level2;
      globals.setting_level3 = setting_level3;


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



        await createMany([
          {
            model: 'SaloneSetting',
            data: { saloneId: salone.id, settingId: setting_level0.id, content: 'saloneSetting.0' },
          },
          {
            model: 'SaloneSetting',
            data: { saloneId: salone.id, settingId: setting_level1.id, content: 'saloneSetting.1' },
          },
          {
            model: 'SaloneSetting',
            data: { saloneId: salone.id, settingId: setting_level2.id, content: 'saloneSetting.2' },
          },
          {
            model: 'SaloneSetting',
            data: { saloneId: salone.id, settingId: setting_level3.id, content: 'saloneSetting.3' },
          },
        ]).then(([saloneSetting0, saloneSetting1, saloneSetting2, saloneSetting3]) => {
          globals.saloneSetting0 = saloneSetting0;
          globals.saloneSetting1 = saloneSetting1;
          globals.saloneSetting2 = saloneSetting2;
          globals.saloneSetting3 = saloneSetting3;
        });
        


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
    const { domainModer } = globals;

    await page.goto('https://foto.ru:3000');
    await page.locator('.login-link').click();
    await page.locator('[data-cy=nickName]').type(domainModer.nickName);
    await page.locator('[data-cy=password]').type(domainModer.psw);
    await page.locator('[data-cy=loginButton]').click();
  };


  const loginOtherDomain = async (page, person = globals.domainModer) => {
    await page.goto('https://localhost:3000');
    await page.locator('.login-link').click();
    await page.locator('[data-cy=nickName]').type(person.nickName);
    await page.locator('[data-cy=password]').type(person.psw);
    await page.locator('[data-cy=loginButton]').click();
  };


test.describe.only('Вход в кофигуратор (админку) системы (только на домен в своем Салоне)', () => {
  test.only('Can enter admin dashboard on own domain', async ({page}) => {
    const { superAdmin, domainAdmin, moder, domainModer } = globals;
    await login(page); 
    await expect(page.locator('.admin-menu a')).not.toHaveClass(/p-disabled/);
  });
  test.only('Can not enter admin dashboard on other domain', async ({page}) => {
    const { superAdmin, domainAdmin, moder, domainModer } = globals;
    await loginOtherDomain(page); 
    await expect(page.locator('.admin-menu a')).toHaveClass(/p-disabled/);
  });
});

test.describe('', () => {

  test('Can not choose anyone', async ({page}) => {
    const { superAdmin, domainAdmin, moder, domainModer } = globals;
    await login(page); 
    await page.click('text=admin', {delay: 100});
    await page.click('text=users');
    await expect(page.locator('text=admins')).toBeDisabled();
  });

  test('Can view only contest on own domain', async ({page}) => {
    const { user } = globals;
    await login(page);
    await page.click('text=admin', {delay: 100});
    await page.click('text=organization');
    await page.click('text=contests');
    
    // await page.pause('')
    await expect(page.locator('table[role=grid] tr[role=row]')).toHaveCount(1);
  });

  test('Can assign jury', async ({ page }) => {
    const { user } = globals;
    await login(page);
    await page.click('text=admin', {delay: 100});
    await page.click('text=organization');
    await page.click('text=contests');

    //HERE 
    //TODO: check if only 1 contest is here
    //check if he can assign jury
    await page.locator('.p-row-toggler').first().click();
    await page.locator('[data-cy=jury]').click();

    await page.locator('.p-dialog [data-cy=addButton]').click();
    await page.locator('#userId').click();
    await page.locator(`[aria-label="${user.firstName} ${user.lastName}"]`).click();
    await page.locator('[type="submit"]').click();
    await expect(page.locator('.p-dialog table[role=grid]')).toContainText(`${user.firstName} ${user.lastName}`);
  });



  test('Can not add new setting, can not see settings of levels lower than 3, can not delete', async ({page}) => {
    const { 
      user,
      setting_level0,
      setting_level1,
      setting_level2,
      setting_level3,
    } = globals;
    await login(page);

    await page.click('text=admin', { delay: 100 });
    await page.click('text=allSettings');
    await page.click('.settings');
    await expect(page.locator('[data-cy=addButton]')).toBeDisabled();
    await expect(page.locator('table[role=grid] tbody tr[role=row] .delButton')).toBeDisabled();
    await expect(page.locator('table[role=grid] tbody tr[role=row]')).toHaveCount(1);
    await expect(page.locator('table[role=grid]')).not.toContainText(setting_level0.code);
  
    // await page.pause('')
  });


  test('Can edit setting of levelable 3', async ({page}) => {
    const { 
      user,
      setting_level0,
      setting_level1,
      setting_level2,
      setting_level3,
    } = globals;
    await login(page);

    await page.click('text=admin', { delay: 100 });
    await page.click('text=allSettings');
    await page.click('.settings');
    await expect(page.locator('[data-cy=addButton]')).toBeDisabled();
    await expect(page.locator('table[role=grid] tbody tr[role=row] .editButton')).not.toBeDisabled();

    await page.locator('table[role=grid] tbody tr[role=row] .editButton').click();

    await page.locator('#typeSet').click();
    await page.locator('[aria-label="json"]').click();
    await page.locator('[type="submit"]').click();
    await expect(page.locator('table[role=grid]')).toContainText('json');
  });


  test('Can not add new setting, can not see settings of levels lower than 3, can not delete', async ({page}) => {
    const { 
      user,
      saloneSetting3
    } = globals;
    await login(page);

    await page.click('text=admin', { delay: 100 });
    await page.click('text=allSettings');
    await page.click('text=saloneSettings');
    await page.pause('')

    await expect(page.locator('[data-cy=addButton]')).toBeDisabled();
    await expect(page.locator('table[role=grid] tbody tr[role=row] .delButton')).toBeDisabled();
    await expect(page.locator('table[role=grid] tbody tr[role=row]')).toHaveCount(1);
    await expect(page.locator('table[role=grid]')).toContainText(saloneSetting3.content);
  });


  test('Can edit saloneSetting of level 3', async ({page}) => {
    const { 
      user,
      saloneSetting3
    } = globals;
    await login(page);

    await page.click('text=admin', { delay: 100 });
    await page.click('text=allSettings');
    await page.click('text=saloneSettings');

    await page.locator('table[role=grid] tbody tr[role=row] .editButton').click();
    await page.locator('textarea').type('Some text ');
    await page.pause('')

    await page.locator('[type="submit"]').click();
    await expect(page.locator('table[role=grid]')).toContainText('Some text');
  });

  test('Can not add salone', async ({page}) => {
    const { 
      user,
      saloneSetting3
    } = globals;
    await login(page);

    await page.click('text=admin', { delay: 100 });
    await page.click('text=organization');
    await page.pause('')
    await expect(page.locator('.p-menuitem-text', {hasText: /^salones$/})).toBeDisabled();
  });




});
