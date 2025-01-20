import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  logging: false, 
  dialectOptions: {
    ssl: // false
    {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default sequelize;
