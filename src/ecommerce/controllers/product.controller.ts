import { Request, Response, NextFunction } from 'express';
import { ProductDto } from '../dtos/product.dto';
import CrudProductUseCase from '../useCase/crudProductUseCase.useCase';

const crudProductUseCase = new CrudProductUseCase();

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await crudProductUseCase.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);
    const product = await crudProductUseCase.findProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: ProductDto = req.body;
    const productId = await crudProductUseCase.createProduct(data);
    res.status(201).json({
      message: 'Product created successfully',
      status: 201,
      id: productId,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: ProductDto = req.body;
    await crudProductUseCase.updateProduct(data);
    res.status(200).json({
      message: 'Product updated successfully',
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);
    await crudProductUseCase.deleteProduct(id);
    res.status(200).json({
      message: 'Product deleted successfully',
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};