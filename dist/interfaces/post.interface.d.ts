import { Document } from 'mongoose';
export interface Post extends Document {
    readonly user: string;
    readonly content: string;
    readonly imageUrl: string;
    readonly createdAt: Date;
}
