import PasswordService from '../../auth/services/password.service';
import { PeopleModel } from '../../config/models/people.model';
import { UsersModel } from '../../config/models/users.model';
import { CreateOrUpdateUserDto } from '../dtos/user.dto';
import { CrudPeopleService } from '../services/crudPeopleService.service';
import CrudUserRolesService from '../services/crudUserRolesService.service';
import { CrudUserService } from '../services/crudUserService.service';

export class CrudUserUseCase {
  private crudUserService: CrudUserService;
  private CrudPeopleService: CrudPeopleService;
  private passwordService: PasswordService;
  private crudUserRolesService: CrudUserRolesService;

  constructor() {
    this.crudUserService = new CrudUserService();
    this.CrudPeopleService = new CrudPeopleService();
    this.passwordService = new PasswordService();
    this.crudUserRolesService = new CrudUserRolesService();
  }

  async createUser(data: CreateOrUpdateUserDto): Promise<number | undefined> {
    const user: Partial<UsersModel> = {
      email: data.email,
      isActive: data.isActive,
      password: data.password,
    };
    user.password = await this.passwordService.hashPassword(data.password);

    const userId = await this.crudUserService.create(user as UsersModel);

    const peopleInfo: Partial<PeopleModel> = {
      firstName: data.people.firstName,
      secondName: data.people.secondName,
      firstLastName: data.people.firstLastName,
      secondLastName: data.people.secondLastName,
      address: data.people.address,
      userId: userId as number,
    };

    const roles = data.roles.map((role) => {
      return {
        roleId: role,
        userId: userId as number,
      };
    });
    await this.crudUserRolesService.createBulk(roles);
    await this.CrudPeopleService.create(peopleInfo as PeopleModel);
    return userId;
  }

  async updateUser(data: CreateOrUpdateUserDto) {
    const user: Partial<UsersModel> = {
      id: data.id,
      email: data.email,
      isActive: data.isActive,
    };

    if (data.password) {
      user.password = await this.passwordService.hashPassword(data.password);
    }

    const peopleInfo: Partial<PeopleModel> = {
      id: data.people.id,
      firstName: data.people.firstName,
      secondName: data.people.secondName,
      firstLastName: data.people.firstLastName,
      secondLastName: data.people.secondLastName,
      address: data.people.address,
      userId: data.people.userId,
    };

    const roles = data.roles.map((role) => {
      return {
        roleId: role,
        userId: user.id as number,
      };
    });
    if (data.id !== undefined) {
      await this.crudUserRolesService.deleteUserRoles(data.id);
    }
    await this.crudUserRolesService.createBulk(roles);

    await this.crudUserService.update(user as UsersModel);
    await this.CrudPeopleService.update(peopleInfo as PeopleModel);
  }

  async deleteUser(id: number) {
    await this.crudUserService.delete(id);
  }

  async getAllUsers() {
    const userInfo = await this.crudUserService.findAll();
    const transformedData = userInfo.map((user) => {
      const userJson = user.toJSON();
      const roles = userJson.userRoles
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          userJson.userRoles.map((userRole: any) => userRole.role)
        : [];
      delete userJson.userRoles;
      return {
        ...userJson,
        people: userJson.people ? userJson.people[0] : {},
        roles,
      };
    });
    return transformedData;
  }

  async getUserById(id: number) {
    const userInfo = (await this.crudUserService.findById(id)).toJSON();
    const roles = userInfo.userRoles
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userInfo.userRoles.map((userRole: any) => userRole.role)
      : [];
    delete userInfo.userRoles;

    const transformedData = {
      ...userInfo,
      people: userInfo.people ? userInfo.people[0] : {},
      roles,
    };

    return transformedData;
  }

  async countRolesUser(id: number): Promise<object> {
    const numberRoles = await this.crudUserService.countUserRoles(id);
    return {
      count: numberRoles,
    };
  }
}
