import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
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
  filePath: Scalars['String'];
  group: Group;
  groupId: Scalars['ID'];
  id: Scalars['ID'];
  importedAt: Scalars['Timestamp'];
  name: Scalars['String'];
  owner: User;
  ownerId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users: UserPagination;
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

export type CreateUserMutationVariables = Exact<{
  userId: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
}>;

export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, status: UserStatus } };

export const CreateUserDocument = gql`
    mutation createUser($userId: String!, $name: String!, $password: String!) {
  createUser(input: {userId: $userId, name: $name, password: $password}) {
    id
    name
    status
  }
}
    `

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action()

export function getSdk (client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createUser (variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit['headers']): Promise<CreateUserMutation> {
      return withWrapper(wrappedRequestHeaders => client.request<CreateUserMutation>(CreateUserDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'createUser', 'mutation')
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>;
