import { PeopleModel } from '../../config/models/people.model';
import { RolesModel } from '../../config/models/roles.model';
import { UserRolesModel } from '../../config/models/userRoles.model';
import { UsersModel } from '../../config/models/users.model';
import { HttpException } from '../../filters/exception.filter';

export class CrudUserService {
  async create(data: Partial<UsersModel>): Promise<number> {
    const existingUser = await UsersModel.findOne({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new HttpException(400, 'Email already exists');
    }
    const user = await UsersModel.create(data);
    return user.id;
  }

  async update(data: Partial<UsersModel>) {
    const existingUser = await UsersModel.findOne({
      where: {
        id: {
          $ne: data.id,
        },
      },
    });
    if (existingUser) {
      throw new HttpException(400, 'Email already exists');
    }
    await UsersModel.update(data, { where: { id: data.id } });
  }

  async delete(id: number) {
    const user = await UsersModel.findByPk(id);
    if (!user) {
      throw new HttpException(404, 'User not found');
    }
    await UsersModel.update({ deletedAt: new Date() }, { where: { id } });
  }

  async findAll() {
    return await UsersModel.findAll({
      include: [
        {
          model: PeopleModel,
          as: 'people',
        },
        {
          model: UserRolesModel,
          as: 'userRoles',
          include: [
            {
              model: RolesModel,
              as: 'role',
            },
          ],
        },
      ],
    });
  }

  async findById(id: number) {
    const user = await UsersModel.findByPk(id, {
      include: [
        {
          model: PeopleModel,
          as: 'people',
        },
        {
          model: UserRolesModel,
          as: 'userRoles',
          include: [
            {
              model: RolesModel,
              as: 'role',
            },
          ],
        },
      ],
    });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }
    return user;
  }
}
