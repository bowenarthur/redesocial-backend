import { Request, Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: Request, res: Response): Promise<any>;
    signup(req: Request, res: Response): Promise<any>;
    verifyToken(): void;
}
