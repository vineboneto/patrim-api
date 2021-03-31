import { makeAuthMiddleware } from '@/main/factories/middlewares'
import { adaptMiddleware } from '@/main/adapters'

export const auth = adaptMiddleware(makeAuthMiddleware())
