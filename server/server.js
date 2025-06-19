require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();
const port = process.env.PORT || 5000;

// Test database connection
const sequelize = new Sequelize({
  dialect: 'mysql',
  ...require('./config/config.json').development
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established');
    
    app.get('/', (req, res) => res.send('Alumni Network API'));
    
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error('❌ Startup failed:', error.message);
    process.exit(1);
  }
})();