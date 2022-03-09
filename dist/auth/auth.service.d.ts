import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { JwtStrategy } from './jwt.strategy';
export declare class AuthService {
    private userModel;
    private jwtstrategy;
    constructor(userModel: Model<User>, jwtstrategy: JwtStrategy);
    login(req: any, res: any): Promise<any>;
    private generateToken;
    signup(req: any, res: any): Promise<any>;
}
