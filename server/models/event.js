'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: { msg: 'Must be a valid URL' }
      }
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    tableName: 'Events',
    timestamps: true,
    paranoid: true
  });

  // Associations
  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator'
    });

    Event.belongsToMany(models.User, {
      through: models.EventParticipant,
      foreignKey: 'eventId',
      otherKey: 'userId',
      as: 'participants'
    });
  };

  return Event;
};
