import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { ProductModel } from './product.model';

@Table({
  tableName: 'product_history_price',
  timestamps: true,
})
export class ProductHistoryPriceModel extends Model {
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

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  oldPrice!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  newPrice!: number;

  @CreatedAt
  createdAt!: Date;

  @BelongsTo(() => ProductModel)
  product!: ProductModel;
}
