import { makeCheckOwnerByIdMiddleware } from '@/main/factories/middlewares'
import { adaptMiddleware } from '@/main/adapters'

export const checkOwnerId = adaptMiddleware(makeCheckOwnerByIdMiddleware())
