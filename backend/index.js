const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Import Dog model
const Dog = require('./models/Dog')(sequelize, DataTypes);
const dogRoutes = require('./routes/dogs')(Dog);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', dogRoutes);

// Sync database and start server
const PORT = 3000;
sequelize.sync().then(() => {
  console.log('Database synced successfully');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});
