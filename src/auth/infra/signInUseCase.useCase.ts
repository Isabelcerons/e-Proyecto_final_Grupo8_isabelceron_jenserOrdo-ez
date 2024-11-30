import { HttpException } from '../../middelwares/exception.filter';
import { CrudUserService } from '../../users/services/crudUserService.service';
import { AuthDto, AuthResponseDto } from '../dtos/auth.dto';
import PasswordService from '../services/password.service';
import { SignInService } from '../services/signInService.service';

export class SignInUseCase {
  private signInService: SignInService;
  private passwordService: PasswordService;
  private crudUserServices: CrudUserService;

  constructor() {
    this.signInService = new SignInService();
    this.passwordService = new PasswordService();
    this.crudUserServices = new CrudUserService();
  }

  async signIn(data: AuthDto): Promise<AuthResponseDto> {
    const user = await this.crudUserServices.findUserByEmail(data.email);

    const isValidPassword = await this.passwordService.comparePassword(
      data.password,
      user.password?.toString() || '',
    );
    if (!isValidPassword) {
      throw new HttpException(401, 'Invalid password');
    }

    return this.signInService.signIn({ id: user.id, email: user.email });
  }
}
