import { sequelize } from './config/database';
import app from './app';
import { setupSwagger } from './swagger';

const PORT = process.env.PORT || 3000;

console.log('Database connecting');
sequelize.sync().then(() => {
  console.log('Database connected');

  setupSwagger(app);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
