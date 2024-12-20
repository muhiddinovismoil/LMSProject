import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';
import { OTP } from 'src/user/entities/otp.entity';
import { Category } from 'src/category/entities/category.entity';
import { Course } from 'src/course/entities/course.entity';
import { Group } from 'src/group/entities/group.entity';
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
