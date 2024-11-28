import {
  Table,
  Column,
  Model,
  DataType,
  DeletedAt,
  HasMany,
} from 'sequelize-typescript';
import { ProductCategoriesModel } from './productCategories.model';
import { ProductHistoryPriceModel } from './productHistoryPrice.model';

@Table({
  tableName: 'products',
  timestamps: true,
})
export class ProductModel extends Model {
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
  name!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @DeletedAt
  deletedAt?: Date;

  @HasMany(() => ProductCategoriesModel)
  productCategories!: ProductCategoriesModel[];

  @HasMany(() => ProductHistoryPriceModel)
  priceHistory!: ProductHistoryPriceModel[];
}
