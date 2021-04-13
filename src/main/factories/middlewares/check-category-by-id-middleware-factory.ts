import { CheckCategoryByIdMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols'
import { makeDbCheckCategoryById } from '../usecases'

export const makeCheckCategoryByIdMiddleware = (): Middleware => {
  return new CheckCategoryByIdMiddleware(makeDbCheckCategoryById())
}
