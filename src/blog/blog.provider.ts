import { Blog } from './entities/blog.entity';

export const blogProviders = [
  {
    provide: 'BLOG_REPOSITORY',
    useValue: Blog,
  },
];
