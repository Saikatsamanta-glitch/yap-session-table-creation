module.exports = (sequelize, Sequelize) => sequelize.define('state', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  url_params: {
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
