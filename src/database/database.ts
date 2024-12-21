import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';
import { OTP } from '../user/entities/otp.entity';
import { Category } from '../category/entities/category.entity';
import { Course } from '../course/entities/course.entity';
import { Group } from '../group/entities/group.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1111',
        database: 'postgres',
      });
      sequelize.addModels([User, OTP, Category, Course, Group]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
