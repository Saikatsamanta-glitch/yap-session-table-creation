module.exports = (sequelize, Sequelize) => sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  deleted: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  category_order: {
    type: Sequelize.INTEGER,
  },
  dark_logo: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'FallbackIcon-dark.svg',
  },
  light_logo: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'FallbackIcon-light.svg',
  },
});
