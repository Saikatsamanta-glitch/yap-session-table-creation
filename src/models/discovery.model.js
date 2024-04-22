module.exports = (sequelize, Sequelize) => sequelize.define('discovery', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  slug: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  keywords: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  subtitle: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  banner_image: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  mobile_banner_image: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  meta_title: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  meta_description: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  meta_keywords: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  og_image: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  deleted: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
