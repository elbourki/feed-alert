/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFeed = /* GraphQL */ `
  query GetFeed($id: ID!) {
    getFeed(id: $id) {
      id
      name
      link
      fetchedAt
      items {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFeeds = /* GraphQL */ `
  query ListFeeds(
    $filter: ModelFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeeds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        link
        fetchedAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      feedID
      guid
      title
      link
      html
      categories
      publishedAt
      feed {
        id
        name
        link
        fetchedAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        feedID
        guid
        title
        link
        html
        categories
        publishedAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserFeed = /* GraphQL */ `
  query GetUserFeed($id: ID!) {
    getUserFeed(id: $id) {
      id
      feedID
      feed {
        id
        name
        link
        fetchedAt
        createdAt
        updatedAt
      }
      lastReadItemID
      lastReadItem {
        id
        feedID
        guid
        title
        link
        html
        categories
        publishedAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserFeeds = /* GraphQL */ `
  query ListUserFeeds(
    $filter: ModelUserFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserFeeds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        feedID
        lastReadItemID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
