import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/repositories/user.repository';
import { AuthModule } from './auth.module';
import { userProviders } from '../user/ user.providers';
import { UserModule } from '../user/user.module';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UserModule],
      controllers: [AuthController],
      providers: [AuthService, UserRepository, ...userProviders],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
