import { ProductHistoryPriceModel } from '../../config/models/productHistoryPrice.model';

export class CrudHistoryProductService {
  async create(data: Partial<ProductHistoryPriceModel>): Promise<number> {
    const productHistory = await ProductHistoryPriceModel.create(data);
    return productHistory.id;
  }
}

export default CrudHistoryProductService;
