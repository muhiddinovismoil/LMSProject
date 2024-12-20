import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'category', timestamps: true, paranoid: true })
export class Category extends Model<Category> {
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
