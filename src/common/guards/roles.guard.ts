import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/users/providers';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    let roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(), // Method Roles
      context.getClass(), // Controller Roles
    ]);
    
    if (!roles) {
        return true;
    }
    roles = roles.map(value => value.toLowerCase());
    const {id} = context.switchToHttp().getRequest().query;
    const user = await this.userService.findOneById(id);
    return roles.includes(user.role.name.toLowerCase());
  }
}
