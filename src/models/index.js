// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Feed, Item, UserFeed } = initSchema(schema);

export {
  Feed,
  Item,
  UserFeed
};