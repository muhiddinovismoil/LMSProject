import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({ tableName: 'BLOG' })
export class Blog extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column
  title: string;

  @Column
  short_desc: string;

  @Column
  description: string;
}
