import { Request, Response } from 'express';
export interface AuthResponse {
    req: Request;
    res: Response;
}
