// Load environment variables from .env
require('dotenv').config();

// Import the Express app
const app = require('./app');

// Import the Sequelize instance
const { sequelize } = require('./models');

// Define port from environment or use default
const PORT = process.env.PORT || 5000;

// Async IIFE to start the server after DB is connected
(async () => {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Sync models with DB
    await sequelize.sync({ alter: true }); // Use { force: true } to drop & recreate

    // Start listening for requests
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Startup failed:', error.message);
    process.exit(1); // Exit process on failure
  }
})();
