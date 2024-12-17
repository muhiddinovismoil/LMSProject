import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Blog } from 'src/blog/entities/blog.entity';

@Table({ tableName: 'USER' })
export class User extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column
  name: string;

  @Column
  age: number;

  @Column
  gender: string;

  @Column
  status: string;

  @Column
  is_merried: boolean;

  @Column
  role: string;

  @HasMany(() => Blog)
  blogs: Blog[];
}
