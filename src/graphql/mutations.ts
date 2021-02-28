/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateFeed = /* GraphQL */ `
  mutation UpdateFeed(
    $input: UpdateFeedInput!
    $condition: ModelFeedConditionInput
  ) {
    updateFeed(input: $input, condition: $condition) {
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
          snippet
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
export const deleteFeed = /* GraphQL */ `
  mutation DeleteFeed(
    $input: DeleteFeedInput!
    $condition: ModelFeedConditionInput
  ) {
    deleteFeed(input: $input, condition: $condition) {
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
          snippet
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
      snippet
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
      snippet
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
export const createFeed = /* GraphQL */ `
  mutation CreateFeed(
    $input: CreateFeedInput!
    $condition: ModelFeedConditionInput
  ) {
    createFeed(input: $input, condition: $condition) {
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
          snippet
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
      snippet
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
export const createUserFeed = /* GraphQL */ `
  mutation CreateUserFeed(
    $input: CreateUserFeedInput!
    $condition: ModelUserFeedConditionInput
  ) {
    createUserFeed(input: $input, condition: $condition) {
      id
      feedID
      name
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
      name
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
      name
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
      owner
    }
  }
`;
