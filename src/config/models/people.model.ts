import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  DeletedAt,
} from 'sequelize-typescript';
import { UsersModel } from './users.model';

@Table({
  tableName: 'people',
  timestamps: true,
})
export class PeopleModel extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  secondName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstLastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  secondLastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string;

  @ForeignKey(() => UsersModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  userId!: number;

  @DeletedAt
  deletedAt?: Date;

  @BelongsTo(() => UsersModel)
  user?: UsersModel;
}
