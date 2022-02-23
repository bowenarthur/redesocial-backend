/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Post } from '../interfaces/post.interface';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST_MODEL')
    private postModel: Model<Post>
  ) {}

  getPosts(req, res) {
    return res.status(200).send('ok');
  }

  createPost(req, res) {
    return res.status(200).send('ok');
  }

  updatePost(req, res) {
    return res.status(200).send('ok');
  }

  deletePost(req, res) {
    return res.status(200).send('ok');
  }
}
