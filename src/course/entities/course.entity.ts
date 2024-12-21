import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Category } from '../../category/entities/category.entity';
@Table({ tableName: 'course', timestamps: true, paranoid: true })
export class Course extends Model<Course> {
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
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  category_id: number;
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
