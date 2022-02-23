/* eslint-disable prettier/prettier */
import { PostSchema } from './../schemas/post.schema';
import { Connection } from 'mongoose';

export const postProviders = [
  {
    provide: 'POST_MODEL',
    useFactory: (connection: Connection) => connection.model('Post', PostSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];