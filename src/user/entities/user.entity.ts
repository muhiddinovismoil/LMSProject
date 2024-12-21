import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Role } from '../../common/enums/role';
import { UserStatus } from '../../common/enums/user.status';

@Table({ tableName: 'users' })
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

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column
  age: number;
  @Column
  profile_log: string;
  @Column
  gender: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
    defaultValue: UserStatus.inactive,
  })
  status: UserStatus;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    defaultValue: Role.student,
  })
  role: Role;
}
