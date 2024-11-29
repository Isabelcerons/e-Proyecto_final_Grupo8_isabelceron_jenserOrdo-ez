import { ProductCategoriesModel } from '../../config/models/productCategories.model';

class CrudProductCategoriesService {
  async createBulk(
    productCategories: { productId: number; categoryId: number }[],
  ): Promise<ProductCategoriesModel[]> {
    return await ProductCategoriesModel.bulkCreate(productCategories);
  }

  async deleteByProductId(productId: number): Promise<number> {
    return await ProductCategoriesModel.destroy({
      where: { productId },
      force: true,
    });
  }
}

export default CrudProductCategoriesService;
