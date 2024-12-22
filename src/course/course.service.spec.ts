import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { CourseRepository } from './repository/course.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

describe('CourseService', () => {
  let courseService: CourseService;
  let courseRepository: Partial<CourseRepository>;
  beforeEach(async () => {
    courseRepository = {
      getAllCourse: jest.fn(),
      getCourseById: jest.fn(),
      createCourse: jest.fn(),
      updateCourseById: jest.fn(),
      deleteCourseById: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: CourseRepository,
          useValue: courseRepository,
        },
      ],
    }).compile();
    courseService = module.get<CourseService>(CourseService);
  });
  it('should create a course', async () => {
    const createCourseDto: CreateCourseDto = {
      name: 'New Course',
      description: 'New Course Description',
      category_id: 1,
    };
    const mockCourse = {
      ...createCourseDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    jest.spyOn(courseRepository, 'createCourse').mockResolvedValue(mockCourse);
    const result = await courseService.create(createCourseDto);
    expect(courseRepository.createCourse).toHaveBeenCalledWith(createCourseDto);
    expect(result).toEqual(mockCourse);
  });
  describe('findAll', () => {
    it('should return all courses', async () => {
      const courses = [
        {
          id: 1,
          name: 'Course 1',
          description: 'Description of Course 1',
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 2,
          name: 'Course 2',
          description: 'Description of Course 2',
          category_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      const mockResolve = {
        msg: 'All courses',
        courses: courses,
      };
      jest
        .spyOn(courseRepository, 'getAllCourse')
        .mockResolvedValue(mockResolve);
      const result = await courseService.findAll(10, 0);
      expect(courseRepository.getAllCourse).toHaveBeenCalledWith(10, 0);
      expect(result).toEqual(mockResolve);
    });
  });
  describe('findOne', () => {
    it('should return a course', async () => {
      const course = {
        id: 1,
        name: 'Course 1',
        description: 'Description of Course 1',
        createdAt: new Date('2024-12-22 15:00:00+05'),
        updatedAt: new Date('2024-12-22 15:00:00+05'),
        deletedAt: null,
      };
      jest
        .spyOn(courseRepository, 'getCourseById')
        .mockResolvedValue({ msg: 'Course', course: course });
      const result = await courseService.findOne(1);
      expect(courseRepository.getCourseById).toHaveBeenCalledWith(1);
      expect(result).toEqual({ msg: 'Course', course: course });
    });
  });
  describe('update', () => {
    it('should update course', async () => {
      const updateCourseDto: UpdateCourseDto = {
        name: 'Updated Course',
        description: 'Updated Course Description',
      };
      jest
        .spyOn(courseRepository, 'updateCourseById')
        .mockResolvedValue({ msg: 'Course updated' });
      const result = await courseService.update(1, updateCourseDto);
      expect(courseRepository.updateCourseById).toHaveBeenCalledWith(
        1,
        updateCourseDto,
      );
      expect(result).toEqual({ msg: 'Course updated' });
    });
  });
  describe('remove', () => {
    it('should remove course', async () => {
      const courseId: number = 1;
      jest.spyOn(courseRepository, 'deleteCourseById').mockResolvedValue({
        msg: 'Course deleted',
        deletedCourseId: courseId,
      });
      const result = await courseService.remove(courseId);
      expect(courseRepository.deleteCourseById).toHaveBeenCalledWith(courseId);
      expect(result).toEqual({
        msg: 'Course deleted',
        deletedCourseId: courseId,
      });
    });
  });
});
