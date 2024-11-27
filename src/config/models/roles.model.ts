// src/models/roles.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  DeletedAt,
} from 'sequelize-typescript';
import { UserRolesModel } from './userRoles.model';

@Table({
  tableName: 'roles',
  timestamps: true,
})
export class RolesModel extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @DeletedAt
  deletedAt?: Date;

  @HasMany(() => UserRolesModel)
  userRoles?: UserRolesModel[];
}
