import { Request, Response, NextFunction } from 'express';
import { CreateOrUpdateUserDto } from '../dtos/user.dto';
import { CrudUserUseCase } from '../useCase/crudUsers.UseCase';

const crudUserUseCase = new CrudUserUseCase();

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await crudUserUseCase.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);
    const user = await crudUserUseCase.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: CreateOrUpdateUserDto = req.body;
    const userId = await crudUserUseCase.createUser(data);
    res.status(201).json({
      message: 'Registro creado exitosamente',
      status: 201,
      id: userId,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: CreateOrUpdateUserDto = req.body;
    await crudUserUseCase.updateUser(data);
    res.status(200).json({
      message: 'Registro actualizado correctamente',
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);
    await crudUserUseCase.deleteUser(id);
    res.status(200).json({
      message: 'Registro eliminado correctamente',
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const countUsersRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);
    const count = await crudUserUseCase.countRolesUser(id);
    res.status(200).json(count);
  } catch (error) {
    next(error);
  }
};
