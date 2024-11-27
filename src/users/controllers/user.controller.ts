import { Request, Response } from 'express';

import { CreateOrUpdateUserDto } from '../dtos/user.dto';
import { CrudUserUseCase } from '../useCase/crudUsers.UseCase';

const crudUserUseCase = new CrudUserUseCase();

export const getUsers = async (req: Request, res: Response) => {
  const users = await crudUserUseCase.getAllUsers();
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await crudUserUseCase.getUserById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send();
  }
};

export const createUser = async (req: Request, res: Response) => {
  const data: CreateOrUpdateUserDto = req.body;
  const userId = await crudUserUseCase.createUser(data);
  res.status(201).json({ id: userId });
};

export const updateUser = async (req: Request, res: Response) => {
  const data: CreateOrUpdateUserDto = {
    ...req.body,
    id: parseInt(req.params.id),
  };
  await crudUserUseCase.updateUser(data);
  res.status(204).send();
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await crudUserUseCase.deleteUser(id);
  res.status(204).send();
};
