import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/providers';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(name: string, pass: string): Promise<{
        id: string;
        googleId: string;
        facebookId: string;
        linkedinId: string;
        name: string;
        email: string;
        phone: string;
        orders: import("src/shared/entity").Order[];
        childs: import("src/shared/entity").Child[];
        role: import("src/shared/entity").Role;
        chats: Promise<import("src/shared/entity").Chat[]>;
        messages: import("src/shared/entity").Message[];
        teacher: import("src/shared/entity").Teacher;
        files: Promise<import("src/shared/entity").File[]>;
    }>;
    jwtLogin(user: any, eventType: 'login' | 'register'): Promise<{
        accessToken: string;
        eventType: "login" | "register";
    }>;
}
