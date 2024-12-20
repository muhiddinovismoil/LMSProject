import { Course } from './entities/course.entity';
export const courseProvider = [
  {
    provide: 'COURSE_REPO',
    useValue: Course,
  },
];
