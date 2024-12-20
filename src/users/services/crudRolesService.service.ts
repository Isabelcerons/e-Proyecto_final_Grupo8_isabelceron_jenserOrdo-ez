import { Op } from 'sequelize';
import { RolesModel } from '../../config/models/roles.model';
import { HttpException } from '../../middelwares/exception.filter';

export class CrudRolesService {
  async create(data: Partial<RolesModel>): Promise<number> {
    const existingRole = await RolesModel.findOne({
      where: { name: data.name },
    });
    if (existingRole) {
      throw new HttpException(400, 'Role name already exists');
    }
    const role = await RolesModel.create(data);
    return role.id;
  }

  async update(data: Partial<RolesModel>) {
    const existingRole = await RolesModel.findOne({
      where: {
        name: data.name,
        id: {
          $ne: data.id,
        },
      },
    });
    if (existingRole) {
      throw new HttpException(400, 'Role name already exists');
    }
    await RolesModel.update(data, { where: { id: data.id } });
  }

  async delete(id: number) {
    const role = await RolesModel.findByPk(id);
    if (!role) {
      throw new HttpException(404, 'Role not found');
    }
    await RolesModel.destroy({ where: { id } });
  }

  async findAll() {
    return await RolesModel.findAll();
  }

  async findById(id: number) {
    const role = await RolesModel.findByPk(id);
    if (!role) {
      throw new HttpException(404, 'Role not found');
    }
    return role;
  }

  async countRoles(): Promise<number> {
    // Count the number of roles where deletedAt is null
    const numberRoles = await RolesModel.count({
      where: {
        deletedAt: {
          [Op.is]: null,
        },
      },
    });

    // Return the count of roles
    return numberRoles;
  }

  async searchRoleByName(name: string) {
    const role = await RolesModel.findOne({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    return role ? role : {};
  }
}

export default CrudRolesService;
