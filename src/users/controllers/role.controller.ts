import { Request, Response, NextFunction } from 'express';
import { CreateOrUpdateRoleDto } from '../dtos/role.dto';
import CrudRolesUseCase from '../useCase/crudRolesUseCase.useCase';

const crudRolesUseCase = new CrudRolesUseCase();

export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roles = await crudRolesUseCase.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);
    const role = await crudRolesUseCase.getRoleById(id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: CreateOrUpdateRoleDto = req.body;
    const roleId = await crudRolesUseCase.createRole(data);
    res.status(201).json({
      message: 'Role created successfully',
      status: 201,
      id: roleId,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: CreateOrUpdateRoleDto = req.body;
    await crudRolesUseCase.updateRole(data);
    res.status(200).json({
      message: 'Role updated successfully',
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);
    await crudRolesUseCase.deleteRole(id);
    res.status(200).json({
      message: 'Role deleted successfully',
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const searchRoleByName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const name = req.query.name as string;
    const role = await crudRolesUseCase.getRoleByName(name);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

export const countRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const numberRoles = await crudRolesUseCase.countRoles();
    res.status(200).json(numberRoles);
  } catch (error) {
    next(error);
  }
};
