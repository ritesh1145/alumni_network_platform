'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('full-time', 'part-time', 'internship', 'contract'),
      defaultValue: 'full-time'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    postedBy: {
      type: DataTypes.UUID,
      allowNull: false
    },
    salaryRange: {
      type: DataTypes.STRING
    },
    applyLink: {
      type: DataTypes.STRING,
      validate: { isUrl: true }
    }
  }, {
    tableName: 'Jobs',
    timestamps: true,
    paranoid: true
  });

  Job.associate = (models) => {
    Job.belongsTo(models.User, {
      foreignKey: 'postedBy',
      as: 'poster'
    });
  };

  return Job;
};
