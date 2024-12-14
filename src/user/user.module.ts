import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AuthGuard } from './guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'userRepo',
      useClass: UserRepository,
    },
    {
      provide: 'userSecret',
      useValue: 'qwer12345',
    },
    {
      provide: 'randomString',
      useFactory: () => {
        return Math.random();
      },
    },
    {
      provide: 'apiKey',
      useValue: 'qwertyui12345678dasffbgnfhr',
    },
    // {
    //   provide: 'userName',
    //   useValue: "name",
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    UserRepository,
    UserService,
    AuthGuard,
  ],
  exports: ['userRepo', UserRepository, UserService],
})
export class UserModule {}
//   static forRoot(name: string): DynamicModule {
//     return {
//       module: UserModule,
//       controllers: [UserController],
//       providers: [
//         {
//           provide: 'userRepo',
//           useClass: UserRepository,
//         },
//         {
//           provide: 'userSecret',
//           useValue: 'qwer12345',
//         },
//         {
//           provide: 'randomString',
//           useFactory: () => {
//             return Math.random();
//           },
//         },
//         {
//           provide: 'apiKey',
//           useValue: 'qwertyui12345678dasffbgnfhr',
//         },
//         {
//           provide: 'userName',
//           useValue: name,
//         },
//         UserRepository,
//         UserService,
//       ],
//       exports: ['userName', UserRepository, UserService],
//     };
//   }
// }
