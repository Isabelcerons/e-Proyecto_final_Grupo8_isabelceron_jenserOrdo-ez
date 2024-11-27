import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UsersModel } from './users.model';
import { RolesModel } from './roles.model';

@Table({
  tableName: 'user_roles',
  timestamps: true,
})
export class UserRolesModel extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => UsersModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => RolesModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  roleId!: number;

  @BelongsTo(() => UsersModel)
  user?: UsersModel;

  @BelongsTo(() => RolesModel)
  role?: RolesModel;
}
