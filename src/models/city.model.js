module.exports = (sequelize, Sequelize) => sequelize.define('city', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state_id: {
    type: Sequelize.INTEGER,
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
  is_featured: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
  },
  display_order: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  sort_order: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  deleted: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
