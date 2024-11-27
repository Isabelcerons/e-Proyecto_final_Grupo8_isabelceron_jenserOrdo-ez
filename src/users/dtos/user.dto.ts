export class CreateOrUpdateUserDto {
  id?: number;
  email!: string;
  isActive!: boolean;
  password!: string;
  people!: CreateOrUpdatePeopleDto;
  roles!: number[];
}

export interface CreateOrUpdatePeopleDto {
  id?: number;
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName?: string;
  address: string;
  userId: number;
}
