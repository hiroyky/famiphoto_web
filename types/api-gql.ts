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
  groupId: Scalars['String'];
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

export type IndexingPhotosInput = {
  fast: Scalars['Boolean'];
  groupId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  alterGroupMembers: Group;
  createGroup: Group;
  createOauthClient: OauthClient;
  createUser: User;
  indexingPhotos: Scalars['Boolean'];
  uploadPhoto: PhotoUploadInfo;
};


export type MutationAlterGroupMembersArgs = {
  input: AlterGroupMembersInput;
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


export type MutationIndexingPhotosArgs = {
  input?: InputMaybe<IndexingPhotosInput>;
};


export type MutationUploadPhotoArgs = {
  input?: InputMaybe<UploadPhotoInput>;
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

export type PhotoUploadInfo = {
  __typename?: 'PhotoUploadInfo';
  expireAt: Scalars['Int'];
  uploadUrl: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  belongingGroups: Array<Group>;
  existGroupId: Scalars['Boolean'];
  existUserId: Scalars['Boolean'];
  group: Group;
  isBelongingGroup: Scalars['Boolean'];
  me?: Maybe<User>;
  photo?: Maybe<Photo>;
  photoFile?: Maybe<PhotoFile>;
  photoFiles: Array<PhotoFile>;
  photos: PhotoPagination;
  user?: Maybe<User>;
  users: UserPagination;
};


export type QueryExistGroupIdArgs = {
  id: Scalars['String'];
};


export type QueryExistUserIdArgs = {
  id: Scalars['String'];
};


export type QueryGroupArgs = {
  id: Scalars['ID'];
};


export type QueryIsBelongingGroupArgs = {
  id: Scalars['ID'];
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
  groupId: Scalars['ID'];
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

export type UploadPhotoInput = {
  groupId: Scalars['ID'];
};

export type User = Node & {
  __typename?: 'User';
  belongGroups: Array<Group>;
  id: Scalars['ID'];
  name: Scalars['String'];
  password?: Maybe<UserPassword>;
  status: UserStatus;
  userId: Scalars['String'];
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

export type AlterGroupMembersMutationVariables = Exact<{
  groupId: Scalars['ID'];
  appendUserIds?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  removeUserIds?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type AlterGroupMembersMutation = { __typename?: 'Mutation', alterGroupMembers: { __typename?: 'Group', id: string } };

export type BelongingGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type BelongingGroupsQuery = { __typename?: 'Query', belongingGroups: Array<{ __typename?: 'Group', id: string, groupId: string, name: string }> };

export type CreateGroupMutationVariables = Exact<{
  groupId: Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string, groupId: string } };

export type CreateUserMutationVariables = Exact<{
  userId: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, userId: string, name: string } };

export type ExistUserOrGroupIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ExistUserOrGroupIdQuery = { __typename?: 'Query', existUserId: boolean, existGroupId: boolean };

export type ExistUserIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ExistUserIdQuery = { __typename?: 'Query', existUserId: boolean };

export type GroupQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GroupQuery = { __typename?: 'Query', group: { __typename?: 'Group', id: string, groupId: string, name: string } };

export type GroupMembersQueryVariables = Exact<{
  id: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GroupMembersQuery = { __typename?: 'Query', group: { __typename?: 'Group', userPagination: { __typename?: 'UserPagination', pageInfo: { __typename?: 'PaginationInfo', count: number, totalCount: number, hasNextPage: boolean, hasPreviousPage: boolean, paginationLength: number, page: number }, nodes: Array<{ __typename?: 'User', id: string, userId: string, name: string }> } } };

export type IndexingPhotosMutationVariables = Exact<{
  groupId: Scalars['ID'];
  fast: Scalars['Boolean'];
}>;


export type IndexingPhotosMutation = { __typename?: 'Mutation', indexingPhotos: boolean };

export type IsBelongingGroupQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type IsBelongingGroupQuery = { __typename?: 'Query', isBelongingGroup: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, userId: string, name: string } | null };

export type PhotoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PhotoQuery = { __typename?: 'Query', photo?: { __typename?: 'Photo', id: string, name: string, previewUrl: string, dateTimeOriginal: any, owner: { __typename?: 'User', id: string, name: string }, files: Array<{ __typename?: 'PhotoFile', id: string, fileType: string, fileHash: string }> } | null };

export type PhotosQueryVariables = Exact<{
  groupId: Scalars['ID'];
  id?: InputMaybe<Scalars['ID']>;
  ownerId?: InputMaybe<Scalars['ID']>;
  limit: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type PhotosQuery = { __typename?: 'Query', photos: { __typename?: 'PhotoPagination', pageInfo: { __typename?: 'PaginationInfo', page: number, paginationLength: number, hasNextPage: boolean, hasPreviousPage: boolean, count: number, totalCount: number }, nodes: Array<{ __typename?: 'Photo', id: string, name: string, dateTimeOriginal: any, thumbnailUrl: string, previewUrl: string, ownerId: string, groupId: string }> } };

export type UploadPhotoMutationVariables = Exact<{
  groupId: Scalars['ID'];
}>;


export type UploadPhotoMutation = { __typename?: 'Mutation', uploadPhoto: { __typename?: 'PhotoUploadInfo', expireAt: number, uploadUrl: string } };


export const AlterGroupMembersDocument = gql`
    mutation alterGroupMembers($groupId: ID!, $appendUserIds: [ID!], $removeUserIds: [ID!]) {
  alterGroupMembers(
    input: {groupId: $groupId, appendUserIds: $appendUserIds, removeUserIds: $removeUserIds}
  ) {
    id
  }
}
    `;
export const BelongingGroupsDocument = gql`
    query belongingGroups {
  belongingGroups {
    id
    groupId
    name
  }
}
    `;
export const CreateGroupDocument = gql`
    mutation createGroup($groupId: String!, $name: String!) {
  createGroup(input: {groupId: $groupId, name: $name}) {
    id
    groupId
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($userId: String!, $name: String!, $password: String!) {
  createUser(input: {userId: $userId, name: $name, password: $password}) {
    id
    userId
    name
  }
}
    `;
export const ExistUserOrGroupIdDocument = gql`
    query existUserOrGroupId($id: String!) {
  existUserId(id: $id)
  existGroupId(id: $id)
}
    `;
export const ExistUserIdDocument = gql`
    query existUserId($id: String!) {
  existUserId(id: $id)
}
    `;
export const GroupDocument = gql`
    query group($id: ID!) {
  group(id: $id) {
    id
    groupId
    name
  }
}
    `;
export const GroupMembersDocument = gql`
    query groupMembers($id: ID!, $limit: Int, $offset: Int) {
  group(id: $id) {
    userPagination(limit: $limit, offset: $offset) {
      pageInfo {
        count
        totalCount
        hasNextPage
        hasPreviousPage
        paginationLength
        page
      }
      nodes {
        id
        userId
        name
      }
    }
  }
}
    `;
export const IndexingPhotosDocument = gql`
    mutation indexingPhotos($groupId: ID!, $fast: Boolean!) {
  indexingPhotos(input: {groupId: $groupId, fast: $fast})
}
    `;
export const IsBelongingGroupDocument = gql`
    query isBelongingGroup($id: ID!) {
  isBelongingGroup(id: $id)
}
    `;
export const MeDocument = gql`
    query me {
  me {
    id
    userId
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
    query photos($groupId: ID!, $id: ID, $ownerId: ID, $limit: Int!, $offset: Int) {
  photos(
    groupId: $groupId
    id: $id
    ownerId: $ownerId
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
export const UploadPhotoDocument = gql`
    mutation uploadPhoto($groupId: ID!) {
  uploadPhoto(input: {groupId: $groupId}) {
    expireAt
    uploadUrl
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    alterGroupMembers(variables: AlterGroupMembersMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AlterGroupMembersMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AlterGroupMembersMutation>(AlterGroupMembersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'alterGroupMembers', 'mutation');
    },
    belongingGroups(variables?: BelongingGroupsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BelongingGroupsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BelongingGroupsQuery>(BelongingGroupsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'belongingGroups', 'query');
    },
    createGroup(variables: CreateGroupMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateGroupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateGroupMutation>(CreateGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createGroup', 'mutation');
    },
    createUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser', 'mutation');
    },
    existUserOrGroupId(variables: ExistUserOrGroupIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ExistUserOrGroupIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ExistUserOrGroupIdQuery>(ExistUserOrGroupIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'existUserOrGroupId', 'query');
    },
    existUserId(variables: ExistUserIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ExistUserIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ExistUserIdQuery>(ExistUserIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'existUserId', 'query');
    },
    group(variables: GroupQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GroupQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GroupQuery>(GroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'group', 'query');
    },
    groupMembers(variables: GroupMembersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GroupMembersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GroupMembersQuery>(GroupMembersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'groupMembers', 'query');
    },
    indexingPhotos(variables: IndexingPhotosMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<IndexingPhotosMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<IndexingPhotosMutation>(IndexingPhotosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'indexingPhotos', 'mutation');
    },
    isBelongingGroup(variables: IsBelongingGroupQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<IsBelongingGroupQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<IsBelongingGroupQuery>(IsBelongingGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'isBelongingGroup', 'query');
    },
    me(variables?: MeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeQuery>(MeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'me', 'query');
    },
    photo(variables: PhotoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PhotoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PhotoQuery>(PhotoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'photo', 'query');
    },
    photos(variables: PhotosQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PhotosQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PhotosQuery>(PhotosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'photos', 'query');
    },
    uploadPhoto(variables: UploadPhotoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UploadPhotoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UploadPhotoMutation>(UploadPhotoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'uploadPhoto', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;