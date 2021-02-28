/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFeed = /* GraphQL */ `
  subscription OnCreateFeed {
    onCreateFeed {
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
export const onUpdateFeed = /* GraphQL */ `
  subscription OnUpdateFeed {
    onUpdateFeed {
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
export const onDeleteFeed = /* GraphQL */ `
  subscription OnDeleteFeed {
    onDeleteFeed {
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
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
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
export const onCreateUserFeed = /* GraphQL */ `
  subscription OnCreateUserFeed($owner: String) {
    onCreateUserFeed(owner: $owner) {
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
        }
      }
      owner
    }
  }
`;
export const onUpdateUserFeed = /* GraphQL */ `
  subscription OnUpdateUserFeed($owner: String) {
    onUpdateUserFeed(owner: $owner) {
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
        }
      }
      owner
    }
  }
`;
export const onDeleteUserFeed = /* GraphQL */ `
  subscription OnDeleteUserFeed($owner: String) {
    onDeleteUserFeed(owner: $owner) {
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
        }
      }
      owner
    }
  }
`;
