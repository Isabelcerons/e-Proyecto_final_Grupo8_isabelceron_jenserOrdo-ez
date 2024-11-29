import { ProductModel } from '../../config/models/product.model';
import { ProductCategoriesModel } from '../../config/models/productCategories.model';
import { CategoriesModel } from '../../config/models/categories.model';
import { ProductHistoryPriceModel } from '../../config/models/productHistoryPrice.model';
import { HttpException } from '../../filters/exception.filter';
import { Op } from 'sequelize';

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

  async findAll() {
    return await ProductModel.findAll({
      where: {
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
}
