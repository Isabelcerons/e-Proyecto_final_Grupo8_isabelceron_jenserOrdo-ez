import { UsersModel } from '../../config/models/users.model';

export class CrudUserService {
  async create(data: Partial<UsersModel>): Promise<number | undefined> {
    const user = await UsersModel.create(data);
    return user.id;
  }

  async update(data: Partial<UsersModel>) {
    await UsersModel.update(data, { where: { id: data.id } });
  }

  async delete(id: number) {
    await UsersModel.update({ deletedAt: new Date() }, { where: { id } });
  }

  async findAll() {
    return await UsersModel.findAll();
  }

  async findById(id: number) {
    return await UsersModel.findByPk(id);
  }
}
