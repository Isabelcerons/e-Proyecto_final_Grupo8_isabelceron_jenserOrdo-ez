import {
  Table,
  Column,
  Model,
  DataType,
  DeletedAt,
  HasMany,
} from 'sequelize-typescript';
import { ProductCategoriesModel } from './productCategories.model';

@Table({
  tableName: 'categories',
  timestamps: true,
})
export class CategoriesModel extends Model {
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

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @DeletedAt
  deletedAt?: Date;

  @HasMany(() => ProductCategoriesModel)
  productCategories!: ProductCategoriesModel[];
}
