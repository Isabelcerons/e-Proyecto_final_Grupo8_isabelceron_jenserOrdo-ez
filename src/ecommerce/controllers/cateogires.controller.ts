import { Request, Response, NextFunction } from 'express';
import { CategoryDto } from '../dtos/categories.dto';
import CrudCategoriesUseCase from '../infra/crudCategoriesUseCase.UseCase';

const crudCategoriesUseCase = new CrudCategoriesUseCase();

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await crudCategoriesUseCase.findAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);
    const category = await crudCategoriesUseCase.findCategoryById(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: CategoryDto = req.body;
    const categoryId = await crudCategoriesUseCase.createCategory(data);
    res.status(201).json({
      message: 'Category created successfully',
      status: 201,
      id: categoryId,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: CategoryDto = req.body;
    await crudCategoriesUseCase.updateCategory(data);
    res.status(200).json({
      message: 'Category updated successfully',
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);
    await crudCategoriesUseCase.deleteCategory(id);
    res.status(200).json({
      message: 'Category deleted successfully',
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};
