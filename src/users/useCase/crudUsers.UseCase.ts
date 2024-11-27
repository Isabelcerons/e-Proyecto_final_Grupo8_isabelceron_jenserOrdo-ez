import { UsersModel } from '../../config/models/users.model';
import { CreateOrUpdateUserDto } from '../dtos/user.dto';
import { CrudUserService } from '../services/crudUserService.service';

export class CrudUserUseCase {
  private crudUserService: CrudUserService;

  constructor() {
    this.crudUserService = new CrudUserService();
  }

  async createUser(data: CreateOrUpdateUserDto): Promise<number | undefined> {
    const user: Partial<UsersModel> = {
      email: data.email,
      isActive: data.isActive,
      password: data.password,
    };

    const userId = await this.crudUserService.create(user as UsersModel);

    return userId;
  }

  async updateUser(data: CreateOrUpdateUserDto) {
    const user: Partial<UsersModel> = {
      id: data.id,
      email: data.email,
      isActive: data.isActive,
      password: data.password,
    };

    await this.crudUserService.update(user as UsersModel);
  }

  async deleteUser(id: number) {
    await this.crudUserService.delete(id);
  }

  async getAllUsers() {
    return await this.crudUserService.findAll();
  }

  async getUserById(id: number) {
    return await this.crudUserService.findById(id);
  }
}
