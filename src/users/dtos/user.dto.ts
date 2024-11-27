export class CreateOrUpdateUserDto {
  id?: number;
  email!: string;
  isActive!: boolean;
  password!: string;
}
