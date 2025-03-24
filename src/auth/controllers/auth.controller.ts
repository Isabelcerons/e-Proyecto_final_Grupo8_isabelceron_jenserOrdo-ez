import { Request, Response, NextFunction } from 'express';
import { AuthDto } from '../dtos/auth.dto';
import { SignInUseCase } from '../infra/signInUseCase.useCase';
import { CrudUserService } from '../../users/services/crudUserService.service';

const signInUseCase = new SignInUseCase();
const userService = new CrudUserService();
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authDto: AuthDto = req.body;
    const authResponse = await signInUseCase.signIn(authDto);
    res.status(200).json(authResponse);
  } catch (error) {
    next(error);
  }
};

export const initData = async (
  req: Request & { user?: { id: number; email: string } },
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    const userId = user?.id;

    const data = await userService.findById(Number(userId));

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
/* agregando una linea nueva*/