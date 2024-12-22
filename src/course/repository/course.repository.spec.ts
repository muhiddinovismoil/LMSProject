import { Test, TestingModule } from '@nestjs/testing';
import { CourseRepository } from './course.repository';
import { Course } from '../entities/course.entity';
describe('CourseRepository', () => {
  let courseRepository: CourseRepository;
  let mockCourseModel: Partial<typeof Course>;
  beforeEach(async () => {
    mockCourseModel = {
      findByPk: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      destroy: jest.fn(),
      update: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseRepository,
        { provide: 'COURSE_REPO', useValue: mockCourseModel },
      ],
    }).compile();
    courseRepository = module.get<CourseRepository>(CourseRepository);
  });
  describe('getAllCourse', () => {
    it('should return all course with pagination', async () => {
      const courses = [
        {
          id: 1,
          name: 'Course 1',
          description: 'Description of Course 1',
          category_id: 1,
          createdAt: new Date('2024-12-22 15:00:00+05'),
          updatedAt: new Date('2024-12-22 15:00:00+05'),
          deletedAt: null,
        },
        {
          id: 2,
          name: 'Course 2',
          description: 'Description of Course 2',
          category_id: 2,
          createdAt: new Date('2024-12-22 16:00:00+05'),
          updatedAt: new Date('2024-12-22 16:00:00+05'),
          deletedAt: null,
        },
      ];
      (mockCourseModel.findAll as jest.Mock).mockResolvedValue(courses);
      const result = await courseRepository.getAllCourse(2, 0);
      expect(mockCourseModel.findAll).toHaveBeenCalledWith({
        limit: 2,
        offset: 0,
      });
      expect(result).toEqual({
        msg: 'All courses',
        courses: courses,
      });
    });
  });
  describe('getCourseById', () => {
    it('should return a course by id', async () => {
      const mockData = {
        id: 1,
        name: 'Course 1',
        description: 'Description of Course 1',
        createdAt: new Date('2024-12-22 15:00:00+05'),
        updatedAt: new Date('2024-12-22 15:00:00+05'),
        deletedAt: null,
      };
      (mockCourseModel.findByPk as jest.Mock).mockResolvedValue(mockData);
      const result = await courseRepository.getCourseById(1);
      expect(mockCourseModel.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        msg: 'Course',
        course: mockData,
      });
    });
  });
  describe('createCourse', () => {
    it('should create a course', async () => {
      const mockCourse = {
        name: 'New Course',
        description: 'New Course Description',
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      (mockCourseModel.create as jest.Mock).mockResolvedValue(mockCourse);
      const result = await courseRepository.createCourse(mockCourse);
      expect(mockCourseModel.create).toHaveBeenCalledWith(mockCourse);
      expect(result).toEqual({
        msg: 'New Course created',
      });
    });
  });
  describe('updateCourseById', () => {
    it('should update course by id', async () => {
      const mockUpdateCourse = {
        name: 'Updated',
        description: 'Success',
        updatedAt: new Date(),
      };
      const mockCourse = {
        id: 1,
        name: 'Old Course',
        description: 'Old Description',
        createdAt: new Date('2024-01-01T08:00:00.000Z'),
        updatedAt: new Date('2024-01-01T08:00:00.000Z'),
        deletedAt: null,
      };
      (mockCourseModel.findByPk as jest.Mock).mockResolvedValue(mockCourse);
      (mockCourseModel.update as jest.Mock).mockResolvedValue([1]);
      const result = await courseRepository.updateCourseById(
        1,
        mockUpdateCourse,
      );
      expect(mockCourseModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockCourseModel.update).toHaveBeenCalledWith(mockUpdateCourse, {
        where: { id: 1 },
      });
      expect(result).toEqual({
        msg: 'Course updated',
      });
    });
  });

  describe('deleteCourseById', () => {
    it('should delete course by id', async () => {
      const mockResultCourse = {
        msg: 'Course deleted',
        deletedCourseId: 1,
      };
      const mockCourse = {
        id: 1,
        name: 'Old Course',
        description: 'Old Description',
        createdAt: new Date('2024-01-01T08:00:00.000Z'),
        updatedAt: new Date('2024-01-01T08:00:00.000Z'),
        deletedAt: null,
      };
      (mockCourseModel.findByPk as jest.Mock).mockResolvedValue(mockCourse);
      (mockCourseModel.destroy as jest.Mock).mockResolvedValue(
        mockResultCourse,
      );
      const result = await courseRepository.deleteCourseById(1);
      expect(mockCourseModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockCourseModel.destroy).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockResultCourse);
    });
  });
});
