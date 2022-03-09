import { PostService } from './post.service';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    getPosts(req: any, res: any): Promise<any>;
    createPost(req: any, res: any): Promise<any>;
    updatePost(req: any, res: any): Promise<any>;
    deletePost(req: any, res: any): Promise<any>;
}
