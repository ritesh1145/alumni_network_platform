'use strict';

module.exports = (sequelize, DataTypes) => {
  const EventParticipant = sequelize.define('EventParticipant', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM('going', 'interested', 'not going'),
      defaultValue: 'interested'
    }
  }, {
    tableName: 'EventParticipants',
    timestamps: true,
    // Prevent Sequelize from adding the default 'id' primary key
    id: false,
  });

  return EventParticipant;
};
