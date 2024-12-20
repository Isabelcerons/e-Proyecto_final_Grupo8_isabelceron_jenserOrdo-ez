import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  DeletedAt,
} from 'sequelize-typescript';
import { PeopleModel } from './people.model';
import { UserRolesModel } from './userRoles.model';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class UsersModel extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isActive!: boolean;

  @DeletedAt
  deletedAt!: Date;

  @HasMany(() => PeopleModel)
  people?: PeopleModel[];

  @HasMany(() => UserRolesModel)
  userRoles?: UserRolesModel[];
}
