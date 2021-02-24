/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateFeedInput = {
  id?: string | null,
  name: string,
  link: string,
  fetchedAt: string,
};

export type ModelFeedConditionInput = {
  name?: ModelStringInput | null,
  link?: ModelStringInput | null,
  fetchedAt?: ModelStringInput | null,
  and?: Array< ModelFeedConditionInput | null > | null,
  or?: Array< ModelFeedConditionInput | null > | null,
  not?: ModelFeedConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Feed = {
  __typename: "Feed",
  id?: string,
  name?: string,
  link?: string,
  fetchedAt?: string,
  items?: ModelItemConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelItemConnection = {
  __typename: "ModelItemConnection",
  items?:  Array<Item | null > | null,
  nextToken?: string | null,
};

export type Item = {
  __typename: "Item",
  id?: string,
  feedID?: string,
  guid?: string,
  title?: string,
  link?: string,
  html?: string,
  categories?: string,
  publishedAt?: string,
  feed?: Feed,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateFeedInput = {
  id: string,
  name?: string | null,
  link?: string | null,
  fetchedAt?: string | null,
};

export type DeleteFeedInput = {
  id?: string | null,
};

export type CreateItemInput = {
  id?: string | null,
  feedID: string,
  guid: string,
  title: string,
  link: string,
  html: string,
  categories: string,
  publishedAt: string,
};

export type ModelItemConditionInput = {
  feedID?: ModelIDInput | null,
  guid?: ModelStringInput | null,
  title?: ModelStringInput | null,
  link?: ModelStringInput | null,
  html?: ModelStringInput | null,
  categories?: ModelStringInput | null,
  publishedAt?: ModelStringInput | null,
  and?: Array< ModelItemConditionInput | null > | null,
  or?: Array< ModelItemConditionInput | null > | null,
  not?: ModelItemConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateItemInput = {
  id: string,
  feedID?: string | null,
  guid?: string | null,
  title?: string | null,
  link?: string | null,
  html?: string | null,
  categories?: string | null,
  publishedAt?: string | null,
};

export type DeleteItemInput = {
  id?: string | null,
};

export type CreateUserFeedInput = {
  id?: string | null,
  feedID: string,
  lastReadItemID?: string | null,
};

export type ModelUserFeedConditionInput = {
  feedID?: ModelIDInput | null,
  lastReadItemID?: ModelIDInput | null,
  and?: Array< ModelUserFeedConditionInput | null > | null,
  or?: Array< ModelUserFeedConditionInput | null > | null,
  not?: ModelUserFeedConditionInput | null,
};

export type UserFeed = {
  __typename: "UserFeed",
  id?: string,
  feedID?: string,
  feed?: Feed,
  lastReadItemID?: string | null,
  lastReadItem?: Item,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export type UpdateUserFeedInput = {
  id: string,
  feedID?: string | null,
  lastReadItemID?: string | null,
};

export type DeleteUserFeedInput = {
  id?: string | null,
};

export type ModelFeedFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  link?: ModelStringInput | null,
  fetchedAt?: ModelStringInput | null,
  and?: Array< ModelFeedFilterInput | null > | null,
  or?: Array< ModelFeedFilterInput | null > | null,
  not?: ModelFeedFilterInput | null,
};

export type ModelFeedConnection = {
  __typename: "ModelFeedConnection",
  items?:  Array<Feed | null > | null,
  nextToken?: string | null,
};

export type ModelItemFilterInput = {
  id?: ModelIDInput | null,
  feedID?: ModelIDInput | null,
  guid?: ModelStringInput | null,
  title?: ModelStringInput | null,
  link?: ModelStringInput | null,
  html?: ModelStringInput | null,
  categories?: ModelStringInput | null,
  publishedAt?: ModelStringInput | null,
  and?: Array< ModelItemFilterInput | null > | null,
  or?: Array< ModelItemFilterInput | null > | null,
  not?: ModelItemFilterInput | null,
};

export type ModelUserFeedFilterInput = {
  id?: ModelIDInput | null,
  feedID?: ModelIDInput | null,
  lastReadItemID?: ModelIDInput | null,
  and?: Array< ModelUserFeedFilterInput | null > | null,
  or?: Array< ModelUserFeedFilterInput | null > | null,
  not?: ModelUserFeedFilterInput | null,
};

export type ModelUserFeedConnection = {
  __typename: "ModelUserFeedConnection",
  items?:  Array<UserFeed | null > | null,
  nextToken?: string | null,
};

export type CreateFeedMutationVariables = {
  input?: CreateFeedInput,
  condition?: ModelFeedConditionInput | null,
};

export type CreateFeedMutation = {
  createFeed?:  {
    __typename: "Feed",
    id: string,
    name: string,
    link: string,
    fetchedAt: string,
    items?:  {
      __typename: "ModelItemConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFeedMutationVariables = {
  input?: UpdateFeedInput,
  condition?: ModelFeedConditionInput | null,
};

export type UpdateFeedMutation = {
  updateFeed?:  {
    __typename: "Feed",
    id: string,
    name: string,
    link: string,
    fetchedAt: string,
    items?:  {
      __typename: "ModelItemConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFeedMutationVariables = {
  input?: DeleteFeedInput,
  condition?: ModelFeedConditionInput | null,
};

export type DeleteFeedMutation = {
  deleteFeed?:  {
    __typename: "Feed",
    id: string,
    name: string,
    link: string,
    fetchedAt: string,
    items?:  {
      __typename: "ModelItemConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateItemMutationVariables = {
  input?: CreateItemInput,
  condition?: ModelItemConditionInput | null,
};

export type CreateItemMutation = {
  createItem?:  {
    __typename: "Item",
    id: string,
    feedID: string,
    guid: string,
    title: string,
    link: string,
    html: string,
    categories: string,
    publishedAt: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateItemMutationVariables = {
  input?: UpdateItemInput,
  condition?: ModelItemConditionInput | null,
};

export type UpdateItemMutation = {
  updateItem?:  {
    __typename: "Item",
    id: string,
    feedID: string,
    guid: string,
    title: string,
    link: string,
    html: string,
    categories: string,
    publishedAt: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteItemMutationVariables = {
  input?: DeleteItemInput,
  condition?: ModelItemConditionInput | null,
};

export type DeleteItemMutation = {
  deleteItem?:  {
    __typename: "Item",
    id: string,
    feedID: string,
    guid: string,
    title: string,
    link: string,
    html: string,
    categories: string,
    publishedAt: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserFeedMutationVariables = {
  input?: CreateUserFeedInput,
  condition?: ModelUserFeedConditionInput | null,
};

export type CreateUserFeedMutation = {
  createUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    feedID: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    lastReadItemID?: string | null,
    lastReadItem?:  {
      __typename: "Item",
      id: string,
      feedID: string,
      guid: string,
      title: string,
      link: string,
      html: string,
      categories: string,
      publishedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserFeedMutationVariables = {
  input?: UpdateUserFeedInput,
  condition?: ModelUserFeedConditionInput | null,
};

export type UpdateUserFeedMutation = {
  updateUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    feedID: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    lastReadItemID?: string | null,
    lastReadItem?:  {
      __typename: "Item",
      id: string,
      feedID: string,
      guid: string,
      title: string,
      link: string,
      html: string,
      categories: string,
      publishedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserFeedMutationVariables = {
  input?: DeleteUserFeedInput,
  condition?: ModelUserFeedConditionInput | null,
};

export type DeleteUserFeedMutation = {
  deleteUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    feedID: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    lastReadItemID?: string | null,
    lastReadItem?:  {
      __typename: "Item",
      id: string,
      feedID: string,
      guid: string,
      title: string,
      link: string,
      html: string,
      categories: string,
      publishedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetFeedQueryVariables = {
  id?: string,
};

export type GetFeedQuery = {
  getFeed?:  {
    __typename: "Feed",
    id: string,
    name: string,
    link: string,
    fetchedAt: string,
    items?:  {
      __typename: "ModelItemConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFeedsQueryVariables = {
  filter?: ModelFeedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFeedsQuery = {
  listFeeds?:  {
    __typename: "ModelFeedConnection",
    items?:  Array< {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetItemQueryVariables = {
  id?: string,
};

export type GetItemQuery = {
  getItem?:  {
    __typename: "Item",
    id: string,
    feedID: string,
    guid: string,
    title: string,
    link: string,
    html: string,
    categories: string,
    publishedAt: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListItemsQueryVariables = {
  filter?: ModelItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListItemsQuery = {
  listItems?:  {
    __typename: "ModelItemConnection",
    items?:  Array< {
      __typename: "Item",
      id: string,
      feedID: string,
      guid: string,
      title: string,
      link: string,
      html: string,
      categories: string,
      publishedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserFeedQueryVariables = {
  id?: string,
};

export type GetUserFeedQuery = {
  getUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    feedID: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    lastReadItemID?: string | null,
    lastReadItem?:  {
      __typename: "Item",
      id: string,
      feedID: string,
      guid: string,
      title: string,
      link: string,
      html: string,
      categories: string,
      publishedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUserFeedsQueryVariables = {
  filter?: ModelUserFeedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserFeedsQuery = {
  listUserFeeds?:  {
    __typename: "ModelUserFeedConnection",
    items?:  Array< {
      __typename: "UserFeed",
      id: string,
      feedID: string,
      lastReadItemID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateFeedSubscription = {
  onCreateFeed?:  {
    __typename: "Feed",
    id: string,
    name: string,
    link: string,
    fetchedAt: string,
    items?:  {
      __typename: "ModelItemConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFeedSubscription = {
  onUpdateFeed?:  {
    __typename: "Feed",
    id: string,
    name: string,
    link: string,
    fetchedAt: string,
    items?:  {
      __typename: "ModelItemConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFeedSubscription = {
  onDeleteFeed?:  {
    __typename: "Feed",
    id: string,
    name: string,
    link: string,
    fetchedAt: string,
    items?:  {
      __typename: "ModelItemConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateItemSubscription = {
  onCreateItem?:  {
    __typename: "Item",
    id: string,
    feedID: string,
    guid: string,
    title: string,
    link: string,
    html: string,
    categories: string,
    publishedAt: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateItemSubscription = {
  onUpdateItem?:  {
    __typename: "Item",
    id: string,
    feedID: string,
    guid: string,
    title: string,
    link: string,
    html: string,
    categories: string,
    publishedAt: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteItemSubscription = {
  onDeleteItem?:  {
    __typename: "Item",
    id: string,
    feedID: string,
    guid: string,
    title: string,
    link: string,
    html: string,
    categories: string,
    publishedAt: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserFeedSubscriptionVariables = {
  owner?: string,
};

export type OnCreateUserFeedSubscription = {
  onCreateUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    feedID: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    lastReadItemID?: string | null,
    lastReadItem?:  {
      __typename: "Item",
      id: string,
      feedID: string,
      guid: string,
      title: string,
      link: string,
      html: string,
      categories: string,
      publishedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserFeedSubscriptionVariables = {
  owner?: string,
};

export type OnUpdateUserFeedSubscription = {
  onUpdateUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    feedID: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    lastReadItemID?: string | null,
    lastReadItem?:  {
      __typename: "Item",
      id: string,
      feedID: string,
      guid: string,
      title: string,
      link: string,
      html: string,
      categories: string,
      publishedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserFeedSubscriptionVariables = {
  owner?: string,
};

export type OnDeleteUserFeedSubscription = {
  onDeleteUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    feedID: string,
    feed?:  {
      __typename: "Feed",
      id: string,
      name: string,
      link: string,
      fetchedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    lastReadItemID?: string | null,
    lastReadItem?:  {
      __typename: "Item",
      id: string,
      feedID: string,
      guid: string,
      title: string,
      link: string,
      html: string,
      categories: string,
      publishedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
