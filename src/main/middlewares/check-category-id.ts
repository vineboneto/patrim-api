import { makeCheckCategoryByIdMiddleware } from '@/main/factories/middlewares'
import { adaptMiddleware } from '@/main/adapters'

export const checkCategoryId = adaptMiddleware(makeCheckCategoryByIdMiddleware())
