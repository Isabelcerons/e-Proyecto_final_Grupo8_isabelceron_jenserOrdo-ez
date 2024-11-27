import { sequelize } from './config/database';
import app from './app';
import { setupSwagger } from './swagger';
import logger from './logger';

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  logger.info('Database synchronized successfully');

  setupSwagger(app);

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
});
