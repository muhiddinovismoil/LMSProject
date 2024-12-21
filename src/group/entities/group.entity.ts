import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Course } from '../../course/entities/course.entity';

@Table({ tableName: 'groups', timestamps: true, paranoid: true })
export class Group extends Model<Group> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  public description: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  public course_id: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  public price: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  public start_date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public room: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  public end_date: Date;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  public students: any[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public teacher: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  public createdAt?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  public updatedAt?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  public deletedAt?: Date;
}
