import { ProductModel } from '../../config/models/product.model';
import { ProductCategoriesModel } from '../../config/models/productCategories.model';
import { CategoriesModel } from '../../config/models/categories.model';
import { ProductHistoryPriceModel } from '../../config/models/productHistoryPrice.model';
import { HttpException } from '../../middelwares/exception.filter';
import { Op, WhereOptions } from 'sequelize';

export class CrudProductService {
  async create(data: Partial<ProductModel>): Promise<number> {
    const existingProduct = await ProductModel.findOne({
      where: { name: data.name },
    });
    if (existingProduct) {
      throw new HttpException(400, 'Product name already exists');
    }
    const product = await ProductModel.create(data);
    return product.id;
  }

  async update(data: Partial<ProductModel>) {
    const existingProduct = await ProductModel.findOne({
      where: {
        id: {
          [Op.ne]: data.id,
        },
        name: data.name,
      },
    });
    if (existingProduct) {
      throw new HttpException(400, 'Product name already exists');
    }
    await ProductModel.update(data, { where: { id: data.id } });
  }

  async delete(id: number) {
    const product = await ProductModel.findByPk(id);
    if (!product) {
      throw new HttpException(404, 'Product not found');
    }
    await ProductModel.update({ deletedAt: new Date() }, { where: { id } });
  }

  async findAll(price?: number) {
    const whereClause: WhereOptions = {
      deletedAt: {
        [Op.is]: null,
      },
    };

    if (price) {
      whereClause['$priceHistory.newPrice$'] = {
        [Op.gt]: price,
      };
    }

    return await ProductModel.findAll({
      where: whereClause,
      include: [
        {
          model: ProductCategoriesModel,
          as: 'productCategories',
          required: false,
          include: [
            {
              model: CategoriesModel,
              as: 'category',
              where: {
                deletedAt: {
                  [Op.is]: null,
                },
              },
              required: true,
            },
          ],
        },
        {
          model: ProductHistoryPriceModel,
          as: 'priceHistory',
          required: false,
        },
      ],
    });
  }

  async findById(id: number) {
    const product = await ProductModel.findOne({
      where: {
        id,
        deletedAt: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: ProductCategoriesModel,
          as: 'productCategories',
          required: false,
          include: [
            {
              model: CategoriesModel,
              as: 'category',
              where: {
                deletedAt: {
                  [Op.is]: null,
                },
              },
              required: true,
            },
          ],
        },
        {
          model: ProductHistoryPriceModel,
          as: 'priceHistory',
          required: false,
        },
      ],
    });
    if (!product) {
      throw new HttpException(404, 'Product not found');
    }
    return product;
  }

  async getAveragePrice(productId: number): Promise<number> {
    const prices = await ProductHistoryPriceModel.findAll({
      where: { productId },
      attributes: ['newPrice', 'oldPrice'],
    });

    if (prices.length === 0) {
      throw new HttpException(404, 'No price history found for this product');
    }

    const total = prices.reduce(
      (sum, record) => sum + record.newPrice + record.oldPrice,
      0,
    );
    console.log(total);
    return total / (prices.length * 2);
  }

  async chekProductHistoryPrice(productId: number) {
    const product = await ProductModel.findOne({
      where: {
        id: productId,
        deletedAt: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: ProductHistoryPriceModel,
          as: 'priceHistory',
          required: false,
        },
      ],
    });
    if (!product) {
      throw new HttpException(404, 'Product not found');
    }

    if (product.priceHistory.length === 0) {
      throw new HttpException(404, 'No price history found for this product');
    }
    return product;
  }
  async findMostExpensiveProducts(limit: number): Promise<ProductModel[]> {
    if (isNaN(limit) || limit <= 0) {
      throw new Error('Limit must be a positive number');
    }

    return await ProductModel.findAll({
      where: {
        deletedAt: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: ProductHistoryPriceModel,
          as: 'priceHistory',
          required: true,
        },
      ],
      order: [
        [
          { model: ProductHistoryPriceModel, as: 'priceHistory' },
          'newPrice',
          'DESC',
        ],
      ],
      limit,
    });
  }
}
