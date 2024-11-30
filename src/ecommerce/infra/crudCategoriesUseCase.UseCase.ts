import { CategoryDto } from '../dtos/categories.dto';
import { CategoriesModel } from '../../config/models/categories.model';
import CrudCategoriesService from '../services/crudCategoriesService.Service';

export class CrudCategoriesUseCase {
  private crudCategoriesService: CrudCategoriesService;

  constructor() {
    this.crudCategoriesService = new CrudCategoriesService();
  }

  async createCategory(data: CategoryDto): Promise<number> {
    const category: Partial<CategoriesModel> = {
      name: data.name,
      description: data.description,
    };
    const categoryId = await this.crudCategoriesService.create(category);
    return categoryId;
  }

  async updateCategory(data: CategoryDto): Promise<void> {
    const category: Partial<CategoriesModel> = {
      id: data.id,
      name: data.name,
      description: data.description,
    };
    await this.crudCategoriesService.update(category);
  }

  async deleteCategory(categoryId: number): Promise<void> {
    await this.crudCategoriesService.delete(categoryId);
  }

  async findAllCategories(): Promise<CategoriesModel[]> {
    return await this.crudCategoriesService.findAll();
  }

  async findCategoryById(categoryId: number): Promise<CategoriesModel> {
    return await this.crudCategoriesService.findById(categoryId);
  }
}

export default CrudCategoriesUseCase;
