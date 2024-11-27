import { CreateOrUpdateRoleDto } from '../dtos/role.dto';
import { CrudRolesService } from '../services/crudRolesService.service';
import { RolesModel } from '../../config/models/roles.model';

export class CrudRolesUseCase {
  private crudRolesService: CrudRolesService;

  constructor() {
    this.crudRolesService = new CrudRolesService();
  }

  async createRole(data: CreateOrUpdateRoleDto): Promise<number | undefined> {
    const role: Partial<RolesModel> = {
      name: data.name,
    };

    const roleId = await this.crudRolesService.create(role as RolesModel);
    return roleId;
  }

  async updateRole(data: CreateOrUpdateRoleDto) {
    const role: Partial<RolesModel> = {
      id: data.id,
      name: data.name,
    };

    await this.crudRolesService.update(role as RolesModel);
  }

  async deleteRole(id: number) {
    await this.crudRolesService.delete(id);
  }

  async getAllRoles() {
    const roles = await this.crudRolesService.findAll();
    return roles;
  }

  async getRoleById(id: number) {
    const role = await this.crudRolesService.findById(id);
    return role;
  }

  async countRoles(): Promise<object> {
    return {
      numberRoles: await this.crudRolesService.countRoles(),
    };
  }

  async getRoleByName(name: string) {
    return await this.crudRolesService.searchRoleByName(name);
  }
}

export default CrudRolesUseCase;
