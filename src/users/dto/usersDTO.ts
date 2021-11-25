import { RoleDTO } from 'src/role/dto';

export interface UsersDTO {
  id: number;
  name: string;
  password: string;
  email: string;
  phone: string;
  role: {id: number};
}
