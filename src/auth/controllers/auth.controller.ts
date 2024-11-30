import { Request, Response, NextFunction } from 'express';
import { AuthDto } from '../dtos/auth.dto';
import { SignInUseCase } from '../infra/signInUseCase.useCase';

const signInUseCase = new SignInUseCase();

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
