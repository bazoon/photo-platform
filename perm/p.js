const permissions = {
  superAdmin: [
    'all', 'adminMenu.view'
  ],
  superModer: [
    'settings.view', 'adminMenu.view',
    'admin.create', 'jury.delete', 'jury.update', 'jury.view',
    'jury.create', 'jury.delete', 'jury.update', 'jury.view',
    'salones.view', 'salones.update',
    'contestRegistations.view', 'contestRegistations.delete', 'contestRegistations.update',
    'moders.view', 'moders.update',
    'stats.view.2', 'stats.view.3', 'stats.update.2', 'stats.update.3',
    'contests.view.domain'
  ],
  domainAdmin: [
    'settings.view', 'adminMenu.view', 'moders.view', 'moders.update', 'moders.delete',
    'jury.create', 'jury.edit', 'jury.delete', 'jury.update', 'jury.view',
    'salones.view', 'salones.delete', 'salones.update',
    'contests.view.domain',
  ],
  domainModer: [
    'settings.view', 'adminMenu.view',
    'jury.create.domain', 'jury.edit.domain', 'jury.delete.domain', 'jury.update.domain',
    'salones.view', 'salones.delete', 'salones.update'
  ]
};

const check = {
  superAdmin: () => true,
  // Модератор системы
  superModer: permission => permissions.superModer.includes(permission),
  // Админ салона
  domainAdmin: permission => permissions.domainAdmin.includes(permission),
  // Модератор салона
  domainModer: permission => permissions.domainModer.includes(permission)
};

module.exports.permissions = permissions;
module.exports.checkPermission = check;

// permission structure

  // name.suffix.level

  // settings.view.1

  // {
  //   name: 'settings.create',
  //   level: 2
  // }