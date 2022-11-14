import { PhotosQuery } from '~/types/api-gql'

export type PhotoList = PhotosQuery['photos']['nodes']
