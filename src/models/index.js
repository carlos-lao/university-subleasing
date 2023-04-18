// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Like, Comment, User, Post } = initSchema(schema);

export {
  Like,
  Comment,
  User,
  Post
};