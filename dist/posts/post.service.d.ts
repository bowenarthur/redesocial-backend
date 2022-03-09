import { Model } from 'mongoose';
import { Post } from '../interfaces/post.interface';
export declare class PostService {
    private postModel;
    constructor(postModel: Model<Post>);
    getPosts(req: any, res: any): Promise<any>;
    createPost(req: any, res: any): Promise<any>;
    updatePost(req: any, res: any): Promise<any>;
    deletePost(req: any, res: any): Promise<any>;
}
