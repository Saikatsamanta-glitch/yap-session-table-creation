const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('new_event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  name_hash: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(255),
  },
  image_url: {
    type: Sequelize.STRING(1000),
  },
  thumbnail: {
    type: Sequelize.STRING(1000),
  },
  location_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  deleted: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
