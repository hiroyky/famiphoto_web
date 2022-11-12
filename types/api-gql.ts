import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Cursor: any;
  Timestamp: any;
};

export type AlterGroupInput = {
  name: Scalars['String'];
};

export type AlterGroupMembersInput = {
  appendUserIds?: InputMaybe<Array<Scalars['ID']>>;
  groupId: Scalars['ID'];
  removeUserIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type Connection = {
  edges: Array<Edge>;
  nodes: Array<Node>;
  pageInfo: PageInfo;
};

export type CreateGroupInput = {
  groupId: Scalars['String'];
  name: Scalars['String'];
};

export type CreateOauthClientInput = {
  clientId: Scalars['String'];
  clientType: OauthClientType;
  name: Scalars['String'];
  redirectUrls: Array<Scalars['String']>;
  scope: OauthClientScope;
};

export type CreateUserInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  userId: Scalars['String'];
};

export type Edge = {
  cursor: Scalars['Cursor'];
  node: Node;
};

export type Group = Node & {
  __typename?: 'Group';
  id: Scalars['ID'];
  name: Scalars['String'];
  userPagination: UserPagination;
};


export type GroupUserPaginationArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type GroupEdge = Edge & {
  __typename?: 'GroupEdge';
  cursor: Scalars['Cursor'];
  node: Group;
};

export type GroupPagination = Pagination & {
  __typename?: 'GroupPagination';
  nodes: Array<Group>;
  pageInfo: PaginationInfo;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGroup: Group;
  createOauthClient: OauthClient;
  createUser: User;
};


export type MutationCreateGroupArgs = {
  input: CreateGroupInput;
};


export type MutationCreateOauthClientArgs = {
  input: CreateOauthClientInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type OauthClient = Node & {
  __typename?: 'OauthClient';
  clientId: Scalars['String'];
  clientSecret?: Maybe<Scalars['String']>;
  clientType: OauthClientType;
  id: Scalars['ID'];
  name: Scalars['String'];
  redirectUrls: Array<Scalars['String']>;
  scope: OauthClientScope;
};

export enum OauthClientScope {
  Admin = 'admin',
  General = 'general'
}

export enum OauthClientType {
  ClientCredential = 'ClientCredential',
  UserClient = 'UserClient'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['Cursor']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['Cursor']>;
};

export type Pagination = {
  nodes: Array<Node>;
  pageInfo: PaginationInfo;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  page: Scalars['Int'];
  paginationLength: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Photo = Node & {
  __typename?: 'Photo';
  dateTimeOriginal: Scalars['Timestamp'];
  exifData: Array<PhotoExif>;
  fileTypes: Array<Scalars['String']>;
  files: Array<PhotoFile>;
  group: Group;
  groupId: Scalars['ID'];
  id: Scalars['ID'];
  importedAt: Scalars['Timestamp'];
  name: Scalars['String'];
  owner: User;
  ownerId: Scalars['ID'];
  previewUrl: Scalars['String'];
  thumbnailUrl: Scalars['String'];
};

export type PhotoExif = Node & {
  __typename?: 'PhotoExif';
  id: Scalars['ID'];
  tagId: Scalars['Int'];
  tagType: Scalars['String'];
  valueString: Scalars['String'];
};

export type PhotoFile = Node & {
  __typename?: 'PhotoFile';
  fileHash: Scalars['String'];
  fileType: Scalars['String'];
  group: Group;
  groupId: Scalars['ID'];
  id: Scalars['ID'];
  importedAt: Scalars['Timestamp'];
  owner: User;
  ownerId: Scalars['ID'];
  photo: Photo;
  photoId: Scalars['ID'];
};

export type PhotoPagination = Pagination & {
  __typename?: 'PhotoPagination';
  nodes: Array<Photo>;
  pageInfo: PaginationInfo;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  photo?: Maybe<Photo>;
  photoFile?: Maybe<PhotoFile>;
  photoFiles: Array<PhotoFile>;
  photos: PhotoPagination;
  user?: Maybe<User>;
  users: UserPagination;
};


export type QueryPhotoArgs = {
  id: Scalars['ID'];
};


export type QueryPhotoFileArgs = {
  id: Scalars['ID'];
};


export type QueryPhotoFilesArgs = {
  photoId: Scalars['ID'];
};


export type QueryPhotosArgs = {
  groupId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ownerId?: InputMaybe<Scalars['ID']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type User = Node & {
  __typename?: 'User';
  belongGroups: Array<Group>;
  id: Scalars['ID'];
  name: Scalars['String'];
  password?: Maybe<UserPassword>;
  status: UserStatus;
};

export type UserEdge = Edge & {
  __typename?: 'UserEdge';
  cursor: Scalars['Cursor'];
  node: User;
};

export type UserPagination = Pagination & {
  __typename?: 'UserPagination';
  nodes: Array<User>;
  pageInfo: PaginationInfo;
};

export type UserPassword = Node & {
  __typename?: 'UserPassword';
  id: Scalars['ID'];
  isInitialized: Scalars['Boolean'];
  lastModified: Scalars['Timestamp'];
};

export enum UserStatus {
  Active = 'Active',
  Withdrawal = 'Withdrawal'
}

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string } | null };

export type PhotoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PhotoQuery = { __typename?: 'Query', photo?: { __typename?: 'Photo', id: string, name: string, previewUrl: string, dateTimeOriginal: any, owner: { __typename?: 'User', id: string, name: string }, files: Array<{ __typename?: 'PhotoFile', id: string, fileType: string, fileHash: string }> } | null };

export type PhotosQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  ownerId?: InputMaybe<Scalars['ID']>;
  groupId?: InputMaybe<Scalars['ID']>;
  limit: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type PhotosQuery = { __typename?: 'Query', photos: { __typename?: 'PhotoPagination', pageInfo: { __typename?: 'PaginationInfo', page: number, paginationLength: number, hasNextPage: boolean, hasPreviousPage: boolean, count: number, totalCount: number }, nodes: Array<{ __typename?: 'Photo', id: string, name: string, dateTimeOriginal: any, thumbnailUrl: string, previewUrl: string, ownerId: string, groupId: string }> } };


export const MeDocument = gql`
    query me {
  me {
    id
    name
  }
}
    `;
export const PhotoDocument = gql`
    query photo($id: ID!) {
  photo(id: $id) {
    id
    owner {
      id
      name
    }
    name
    previewUrl
    dateTimeOriginal
    files {
      id
      fileType
      fileHash
    }
  }
}
    `;
export const PhotosDocument = gql`
    query photos($id: ID, $ownerId: ID, $groupId: ID, $limit: Int!, $offset: Int) {
  photos(
    id: $id
    ownerId: $ownerId
    groupId: $groupId
    limit: $limit
    offset: $offset
  ) {
    pageInfo {
      page
      paginationLength
      hasNextPage
      hasPreviousPage
      count
      totalCount
    }
    nodes {
      id
      name
      dateTimeOriginal
      thumbnailUrl
      previewUrl
      ownerId
      groupId
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    me(variables?: MeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeQuery>(MeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'me', 'query');
    },
    photo(variables: PhotoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PhotoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PhotoQuery>(PhotoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'photo', 'query');
    },
    photos(variables: PhotosQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PhotosQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PhotosQuery>(PhotosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'photos', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;