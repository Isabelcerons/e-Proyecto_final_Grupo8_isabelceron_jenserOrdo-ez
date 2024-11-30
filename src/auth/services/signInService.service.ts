import jwt from 'jsonwebtoken';
import { AuthResponseDto } from '../dtos/auth.dto';
import dotenv from 'dotenv';
dotenv.config();

export class SignInService {
  async signIn(data: { id: number; email: string }): Promise<AuthResponseDto> {
    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_EXPIRATION) {
      throw new Error('JWT_SECRET or JWT_REFRESH_SECRET is not defined');
    }
    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    const refreshToken = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    return {
      accessToken: token,
      refreshToken: refreshToken,
    };
  }
}
