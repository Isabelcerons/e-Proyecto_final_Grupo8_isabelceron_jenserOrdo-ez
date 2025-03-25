import bcrypt from 'bcrypt';

class PasswordService {
  private saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export default PasswordService;

//dando funcionalidad a la clase passwordService
//dando funcionalidad a la clase signUpService

//dando funcionalidad a todo
//dando funcionalidad a Mobile legends
//intentando hacer funcionar git flow

