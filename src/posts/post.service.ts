/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST_MODEL')
    private postModel: Model<Post>,
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

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
      } else {
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
    } catch (error) {
      return res.status(400).send(error);
    }
    return res.status(200).send('ok');
  }

  async createPost(req, res) {
    if (!req.body.content) {
      return res.status(400).send('Missing post content');
    }
    try {
      const id = req.user.id;
      await this.postModel.create({ ...req.body, user: id });
      return res.status(200).send('Post created');
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async updatePost(req, res) {
    if (!req.body.content) {
      return res.status(400).send('Missing post content');
    }
    try {
      await this.postModel.findByIdAndUpdate(req.query.id, req.body);
      return res.status(200).send('Post updated');
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async deletePost(req, res) {
    try {
      await this.postModel.findByIdAndDelete(req.query.id);
      return res.status(200).send('Post deleted');
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
