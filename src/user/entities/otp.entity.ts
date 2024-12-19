import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { User } from './user.entity';
@Table({
  tableName: 'otp',
  timestamps: false,
})
export class OTP extends Model<OTP> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  public id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  otp_code: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;
}
