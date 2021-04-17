import { makeCheckPlaceByIdMiddleware } from '@/main/factories/middlewares'
import { adaptMiddleware } from '@/main/adapters'

export const checkPlaceId = adaptMiddleware(makeCheckPlaceByIdMiddleware())
