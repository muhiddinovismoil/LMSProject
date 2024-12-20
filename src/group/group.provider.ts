import { Group } from './entities/group.entity';

export const groupProvider = [
  {
    provide: 'GROUP_REPO',
    useValue: Group,
  },
];
