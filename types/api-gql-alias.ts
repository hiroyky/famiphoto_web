import { GroupMembersQuery, PhotosQuery } from '~/types/api-gql'

export type PhotoList = PhotosQuery['photos']['nodes']
export type GroupMembers = GroupMembersQuery['group']['userPagination']['nodes']
