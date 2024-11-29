import { CategoriesModel } from '../../config/models/categories.model';
import { HttpException } from '../../filters/exception.filter';
import { Op } from 'sequelize';

export class CrudCategoriesService {
  async create(data: Partial<CategoriesModel>): Promise<number> {
    const existingCategory = await CategoriesModel.findOne({
      where: { name: data.name },
    });
    if (existingCategory) {
      throw new HttpException(400, 'Category name already exists');
    }
    const category = await CategoriesModel.create(data);
    return category.id;
  }

  async update(data: Partial<CategoriesModel>) {
    const existingCategory = await CategoriesModel.findOne({
      where: {
        id: {
          [Op.ne]: data.id,
        },
        name: data.name,
      },
    });
    if (existingCategory) {
      throw new HttpException(400, 'Category name already exists');
    }
    await CategoriesModel.update(data, { where: { id: data.id } });
  }

  async delete(id: number) {
    const category = await CategoriesModel.findByPk(id);
    if (!category) {
      throw new HttpException(404, 'Category not found');
    }
    await CategoriesModel.update({ deletedAt: new Date() }, { where: { id } });
  }

  async findAll() {
    return await CategoriesModel.findAll({
      where: {
        deletedAt: {
          [Op.is]: null,
        },
      },
    });
  }

  async findById(id: number) {
    const category = await CategoriesModel.findOne({
      where: {
        id,
        deletedAt: {
          [Op.is]: null,
        },
      },
    });
    if (!category) {
      throw new HttpException(404, 'Category not found');
    }
    return category;
  }
}

export default CrudCategoriesService;
