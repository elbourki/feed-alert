/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFeed = /* GraphQL */ `
  subscription OnCreateFeed {
    onCreateFeed {
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
export const onUpdateFeed = /* GraphQL */ `
  subscription OnUpdateFeed {
    onUpdateFeed {
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
export const onDeleteFeed = /* GraphQL */ `
  subscription OnDeleteFeed {
    onDeleteFeed {
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
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
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
export const onCreateUserFeed = /* GraphQL */ `
  subscription OnCreateUserFeed($owner: String!) {
    onCreateUserFeed(owner: $owner) {
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
export const onUpdateUserFeed = /* GraphQL */ `
  subscription OnUpdateUserFeed($owner: String!) {
    onUpdateUserFeed(owner: $owner) {
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
export const onDeleteUserFeed = /* GraphQL */ `
  subscription OnDeleteUserFeed($owner: String!) {
    onDeleteUserFeed(owner: $owner) {
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
