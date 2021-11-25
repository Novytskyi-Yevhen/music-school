import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/users/providers';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(), // Method Roles
      context.getClass(), // Controller Roles
    ]).map(value => value.toLowerCase());
    
    if (!roles) {
        return true;
    }
    const {id} = context.switchToHttp().getRequest().query;
    const user = await this.userService.findOneById(id);
    return roles.includes(user.role.name.toLowerCase());
  }
}
