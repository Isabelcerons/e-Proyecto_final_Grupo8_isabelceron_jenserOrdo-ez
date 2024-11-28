import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ProductModel } from './product.model';
import { CategoriesModel } from './categories.model';

@Table({
  tableName: 'product_categories',
  timestamps: true,
})
export class ProductCategoriesModel extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => ProductModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  productId!: number;

  @ForeignKey(() => CategoriesModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  categoryId!: number;

  @BelongsTo(() => ProductModel)
  product!: ProductModel;

  @BelongsTo(() => CategoriesModel)
  category!: CategoriesModel;
}
