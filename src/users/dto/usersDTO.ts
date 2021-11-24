import { RoleDTO } from "src/role/dto";

export interface UsersDTO {
    id: number;
    role: RoleDTO;
    availability: string[];
    name: string;
    password: string;
    email: string;
    phone: string;
  }