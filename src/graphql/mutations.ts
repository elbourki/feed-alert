/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFeed = /* GraphQL */ `
  mutation CreateFeed(
    $input: CreateFeedInput!
    $condition: ModelFeedConditionInput
  ) {
    createFeed(input: $input, condition: $condition) {
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
export const updateFeed = /* GraphQL */ `
  mutation UpdateFeed(
    $input: UpdateFeedInput!
    $condition: ModelFeedConditionInput
  ) {
    updateFeed(input: $input, condition: $condition) {
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
export const deleteFeed = /* GraphQL */ `
  mutation DeleteFeed(
    $input: DeleteFeedInput!
    $condition: ModelFeedConditionInput
  ) {
    deleteFeed(input: $input, condition: $condition) {
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
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
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
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
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
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
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
export const createUserFeed = /* GraphQL */ `
  mutation CreateUserFeed(
    $input: CreateUserFeedInput!
    $condition: ModelUserFeedConditionInput
  ) {
    createUserFeed(input: $input, condition: $condition) {
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
export const updateUserFeed = /* GraphQL */ `
  mutation UpdateUserFeed(
    $input: UpdateUserFeedInput!
    $condition: ModelUserFeedConditionInput
  ) {
    updateUserFeed(input: $input, condition: $condition) {
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
export const deleteUserFeed = /* GraphQL */ `
  mutation DeleteUserFeed(
    $input: DeleteUserFeedInput!
    $condition: ModelUserFeedConditionInput
  ) {
    deleteUserFeed(input: $input, condition: $condition) {
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
