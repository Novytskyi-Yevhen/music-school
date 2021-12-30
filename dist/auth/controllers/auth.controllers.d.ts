import { UsersDTO } from 'src/users/dto/usersDTO';
import { UserService } from 'src/users/providers';
import { AuthService } from '../providers/auth.service';
import { RoleService } from 'src/role/providers';
import { HttpService } from '@nestjs/axios';
export declare class AuthController {
    private authService;
    private userService;
    private roleService;
    private httpService;
    constructor(authService: AuthService, userService: UserService, roleService: RoleService, httpService: HttpService);
    login(req: any): Promise<{
        accessToken: string;
        eventType: "login" | "register";
    }>;
    getProfile(req: any): any;
    register(data: UsersDTO): Promise<{
        accessToken: string;
        eventType: "login" | "register";
    }>;
    googleRedirect(req: any): Promise<{
        accessToken: string;
        eventType: "login" | "register";
    }>;
    facebookRedirect(req: any): Promise<{
        accessToken: string;
        eventType: "login" | "register";
    }>;
    linkedinRedirect(req: any): Promise<{
        accessToken: string;
        eventType: "login" | "register";
    }>;
    googleAuth(): Promise<void>;
    facebookAuth(): Promise<void>;
    linkedinAuth(): Promise<void>;
    private socialRegisterOrLogin;
}
