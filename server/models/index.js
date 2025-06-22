'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config(); // Load environment variables

const db = {};

// Initialize Sequelize using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Optional: disable SQL logging
  }
);

// Dynamically read all model files
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Setup associations defined inside each model's .associate method
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// RSVP association
if (db.User && db.Event && db.EventParticipant) {
  db.User.belongsToMany(db.Event, {
    through: db.EventParticipant,
    foreignKey: 'userId',
    otherKey: 'eventId'
  });

  db.Event.belongsToMany(db.User, {
    through: db.EventParticipant,
    foreignKey: 'eventId',
    otherKey: 'userId'
  });
}

// Finalize and export
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Sync database
sequelize.sync({ alter: true }) // Use { force: true } to drop tables (DEV ONLY)
  .then(() => console.log('🛠️ Database synchronized with models'))
  .catch(err => console.error('❌ Sync error:', err));

module.exports = db;
