// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Listing, Comment, User, Like } = initSchema(schema);

export {
  Listing,
  Comment,
  User,
  Like
};