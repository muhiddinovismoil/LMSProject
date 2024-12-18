import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';
import { Blog } from 'src/blog/entities/blog.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres', //sizning username
        password: 'postgres', // sizning passwortiz
        database: 'postgres', //sizning database
      });
      sequelize.addModels([User, Blog]);
      await sequelize.sync({
        // force: true,
      });

      return sequelize;
    },
  },
];
