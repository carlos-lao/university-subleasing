// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Like, Comment, User, Listing } = initSchema(schema);

export {
  Like,
  Comment,
  User,
  Listing
};