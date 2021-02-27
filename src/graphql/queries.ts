/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        featured
        createdAt
        updatedAt
        items {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getFeed = /* GraphQL */ `
  query GetFeed($id: ID!) {
    getFeed(id: $id) {
      id
      name
      link
      featured
      createdAt
      updatedAt
      items {
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
        feed {
          id
          name
          link
          featured
          createdAt
          updatedAt
        }
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
      createdAt
      updatedAt
      feed {
        id
        name
        link
        featured
        createdAt
        updatedAt
        items {
          nextToken
        }
      }
    }
  }
`;
export const getUserFeed = /* GraphQL */ `
  query GetUserFeed($id: ID!) {
    getUserFeed(id: $id) {
      id
      feedID
      name
      lastReadItemID
      createdAt
      updatedAt
      feed {
        id
        name
        link
        featured
        createdAt
        updatedAt
        items {
          nextToken
        }
      }
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
        feed {
          id
          name
          link
          featured
          createdAt
          updatedAt
        }
      }
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
        name
        lastReadItemID
        createdAt
        updatedAt
        feed {
          id
          name
          link
          featured
          createdAt
          updatedAt
        }
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
        owner
      }
      nextToken
    }
  }
`;
