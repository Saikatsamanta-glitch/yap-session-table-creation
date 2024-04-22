module.exports = (sequelize, Sequelize) => sequelize.define('countries', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url_params: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image_key: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  banner_key: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  abbreviations: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  display_order: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  deleted: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
