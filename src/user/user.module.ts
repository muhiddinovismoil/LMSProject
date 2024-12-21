import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './ user.providers';
import { MulterModule } from '@nestjs/platform-express';
import { UserRepository } from './repositories/user.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailConfig } from '../configs/email';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // MulterModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     dest: configService.get<string>('MULTER_DEST'),
    //   }),
    //   inject: [ConfigService],
    // }),
    MulterModule.register({
      dest: './uploads',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule for async configuration
      inject: [ConfigService], // Inject ConfigService to access environment variables
      useFactory: (configService: ConfigService) => {
        const emailConfig = EmailConfig(configService);
        return {
          transport: {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            service: 'gmail',
            auth: {
              user: emailConfig.email,
              pass: emailConfig.pass,
            },
            tls: {
              rejectUnauthorized: false,
            },
          },
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, ...userProviders, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
