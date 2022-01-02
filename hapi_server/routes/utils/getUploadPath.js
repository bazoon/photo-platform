const uploadFolder = 'uploads';



  // const query = `
  //   select contests.id, salones.name, subname, domain, design_code 
  //   from salones, contests 
  //   where contests.salone_id=salones.id and salones.domain=:domain
  // `;

  // const [[contest]] = await models.sequelize.query(query, {
  //   replacements: {
  //     domain
  //   }
  // });

const getUploadFilePath = function getUploadFilePath(name = '') {
  console.assert(name, 'Nome is not defined !!!', name);
  if (!name) return null;
  return name && name.includes('http') ? name : `/${uploadFolder}/${name}`;
};

module.exports = getUploadFilePath;
