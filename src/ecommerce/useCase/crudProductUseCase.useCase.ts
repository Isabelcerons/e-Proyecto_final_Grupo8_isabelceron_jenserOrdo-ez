import { CrudProductService } from '../services/crudProductService.service';

import { ProductModel } from '../../config/models/product.model';
import CrudProductCategoriesService from '../services/crudProductCategoriesService.service';
import { ProductDto } from '../dtos/product.dto';
import CrudHistoryProductService from '../services/crudHistoryProductService.service';
import { ProductHistoryPriceModel } from '../../config/models/productHistoryPrice.model';
import { CategoryDto } from '../dtos/categories.dto';

export class CrudProductUseCase {
  private crudProductService: CrudProductService;
  private crudProductCategoriesService: CrudProductCategoriesService;
  private crudProductHistoryPriceService: CrudHistoryProductService;

  constructor() {
    this.crudProductService = new CrudProductService();
    this.crudProductCategoriesService = new CrudProductCategoriesService();
    this.crudProductHistoryPriceService = new CrudHistoryProductService();
  }

  async createProduct(data: ProductDto): Promise<number> {
    const product: Partial<ProductModel> = {
      name: data.name,
      price: data.price,
      description: data.description,
    };
    const productId = await this.crudProductService.create(product);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productCategories = data.categoriesIds.map((categoryId: any) => ({
      productId,
      categoryId,
    }));
    await this.crudProductCategoriesService.createBulk(productCategories);

    return productId;
  }

  async updateProduct(data: ProductDto): Promise<void> {
    const product: Partial<ProductModel> = {
      id: data.id,
      name: data.name,
      price: data.price,
      description: data.description,
    };

    const prodctRecord = await this.crudProductService.findById(
      Number(data.id),
    );
    if (product.price !== prodctRecord.price) {
      const productHistory: Partial<ProductHistoryPriceModel> = {
        productId: data.id,
        oldPrice: prodctRecord.price,
        newPrice: product.price,
      };
      await this.crudProductHistoryPriceService.create(productHistory);
    }
    await this.crudProductService.update(product);

    await this.crudProductCategoriesService.deleteByProductId(Number(data.id));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productCategories = data.categoriesIds.map((categoryId: any) => ({
      productId: Number(data.id),
      categoryId,
    }));
    await this.crudProductCategoriesService.createBulk(productCategories);
  }

  async deleteProduct(productId: number): Promise<void> {
    await this.crudProductService.delete(productId);
  }

  async findAllProducts() {
    const products = await this.crudProductService.findAll();
    return products.map((product) => {
      const productJson = product.toJSON();
      return {
        ...productJson,

        categories: productJson.productCategories.map(
          (pc: { category: CategoryDto }) => pc.category,
        ),
        productCategories: undefined,
      };
    });
  }

  async findProductById(productId: number) {
    const product = await this.crudProductService.findById(productId);
    const productJson = product.toJSON();
    return {
      ...productJson,

      categories: productJson.productCategories.map(
        (pc: { category: CategoryDto }) => pc.category,
      ),
      productCategories: undefined,
    };
  }
}

export default CrudProductUseCase;
