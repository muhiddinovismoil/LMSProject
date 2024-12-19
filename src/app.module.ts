import { Inject, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ImageKitModule } from 'imagekit-nestjs';
import { ImageKitConfig } from './configs/imagekit.config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/files',

      // renderPath: '/static',
      // serveStaticOptions:
    }),
    ImageKitModule.forRootAsync({
      useFactory: ImageKitConfig,
      inject: [ConfigService],
      imports: [ConfigModule],
      isGlobal: true,
    }),
    // NestjsGrammyModule.forRootAsync({
    //   import: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     token: configService.get<string>('BOT_TOKEN'),
    //   }),
    //   Inject: [ConfigService],
    // }),
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    BlogModule,
  ],
})
export class AppModule {}
