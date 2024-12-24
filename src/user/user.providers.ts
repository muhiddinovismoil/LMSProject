import { OTP } from './entities/otp.entity';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
  {
    provide: 'OTP_REPO',
    useValue: OTP,
  },
];
