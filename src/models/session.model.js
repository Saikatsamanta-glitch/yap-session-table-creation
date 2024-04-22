const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('session', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  event_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  start_date: {
    type: Sequelize.DATE,
  },
  end_date: {
    type: Sequelize.DATE,
  },
  start_date_tz_offset: {
    type: Sequelize.STRING(45),
    allowNull: true,
  },
  attendance_mode: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
  },
  status: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: STATUS.ENABLED,
  },
  deleted: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
}, {
  timestamps: false, // Set this to true if you want Sequelize to manage timestamps automatically
});
