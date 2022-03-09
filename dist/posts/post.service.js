"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
let PostService = class PostService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async getPosts(req, res) {
        const curPage = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.limit) || 5;
        let posts, totalPosts;
        try {
            const id = req.user.id;
            if (req.query.user == 'true') {
                posts = await this.postModel.find({ user: id })
                    .populate('user', 'name')
                    .skip((curPage - 1) * perPage)
                    .limit(perPage)
                    .sort('-createdAt');
                totalPosts = await this.postModel.find({ user: id }).countDocuments();
            }
            else {
                posts = await this.postModel.find({
                    content: { $regex: new RegExp(req.query.search), $options: 'i' },
                })
                    .populate('user', 'name')
                    .skip((curPage - 1) * perPage)
                    .limit(perPage)
                    .sort('-createdAt');
                totalPosts = await this.postModel.find({
                    content: { $regex: new RegExp(req.query.search), $options: 'i' },
                }).countDocuments();
            }
            return res.status(200).json({
                curPage: curPage,
                maxPage: Math.ceil(totalPosts / perPage),
                posts: posts,
            });
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
    async createPost(req, res) {
        if (!req.body.content) {
            return res.status(400).send('Missing post content');
        }
        try {
            const id = req.user.id;
            await this.postModel.create(Object.assign(Object.assign({}, req.body), { user: id }));
            return res.status(200).send({ 'message': 'Post created' });
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
    async updatePost(req, res) {
        if (!req.body.content) {
            return res.status(400).send('Missing post content');
        }
        try {
            await this.postModel.findByIdAndUpdate(req.query.id, req.body);
            return res.status(200).send({ 'message': 'Post updated' });
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
    async deletePost(req, res) {
        try {
            await this.postModel.findByIdAndDelete(req.params.id);
            return res.status(200).send({ 'message': 'Post deleted' });
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('POST_MODEL')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map