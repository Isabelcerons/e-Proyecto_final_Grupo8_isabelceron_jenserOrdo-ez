import { UserRolesModel } from '../../config/models/userRoles.model';

class CrudUserRolesService {
  async createBulk(
    userRoles: { userId: number; roleId: number }[],
  ): Promise<UserRolesModel[]> {
    return await UserRolesModel.bulkCreate(userRoles);
  }

  async deleteUserRoles(userId: number): Promise<number> {
    return await UserRolesModel.destroy({
      where: { userId },
      force: true,
    });
  }
}

export default CrudUserRolesService;
