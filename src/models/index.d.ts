import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Feed {
  readonly id: string;
  readonly name: string;
  readonly link: string;
  readonly items?: (Item | null)[];
  readonly featured: boolean;
  constructor(init: ModelInit<Feed>);
  static copyOf(source: Feed, mutator: (draft: MutableModel<Feed>) => MutableModel<Feed> | void): Feed;
}

export declare class Item {
  readonly id: string;
  readonly feed?: Feed;
  readonly guid: string;
  readonly title: string;
  readonly link: string;
  readonly html?: string;
  readonly snippet?: string;
  readonly categories: string;
  readonly publishedAt: string;
  constructor(init: ModelInit<Item>);
  static copyOf(source: Item, mutator: (draft: MutableModel<Item>) => MutableModel<Item> | void): Item;
}

export declare class UserFeed {
  readonly id: string;
  readonly feed?: Feed;
  readonly name?: string;
  constructor(init: ModelInit<UserFeed>);
  static copyOf(source: UserFeed, mutator: (draft: MutableModel<UserFeed>) => MutableModel<UserFeed> | void): UserFeed;
}