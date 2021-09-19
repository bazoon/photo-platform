const models = require('../models');
const chunk = require('lodash/fp/chunk');


const faker = require('faker');

const images = [
  // '1_7-f2JsSOV6YKtuxMjgSkbg.jpeg',
  // '41g6jROgo0L.png',
  // '58b8e4354ce1dbba2c0db06aa0d7989d.jpg',
  // '60cbc75607159.png',
  // '250px-Корейский_Рандом_(герб)_by_Охико.jpg',
  // '976f0d677081a2b_810x315.png',
  // '1200px-Random-6.jpg',
  // '4261f7b9e393e8830cdfaec30970a888.jpg',
  // '544281_EJUPRVzJ0d_shyayaazoo_title.jpg',
  // '101075562.jpg',
  '128289092-352-k244183.jpg',
  '1535272716_random-loot-mod.jpg',
  '1584640328_turbos-random-vehicles-pack.jpg',
  '1621951422_php9hqyLR.jpg',
  '636708323766319826.png',
];


async function insertImages({ims, regId, sectionId}) {
  await models.Photowork.bulkCreate(
    ims.map(f => {
      return {
        registrationContestId: regId,
        sectionId,
        name: faker.animal.dog(),
        filename: f,
        moder: 0
      };
    })
  );
}

async function run() {

const groups = chunk(images.length/2 + 1)(images);
  await models.initConnection();
  console.log('Connected!')
  groups.forEach(async (ims, idx) => {
    await insertImages(({ims, regId: 99, sectionId: (idx % 2  == 0) ? 9 : 10   }));
  });
}

run();




