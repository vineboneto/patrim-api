import { makeDbCheckCategoryById } from '@/main/factories/usecases'
import { CheckCategoryByIdMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation } from '@/validation/validators'

export const makeCheckCategoryByIdMiddleware = (): Middleware => {
  return new CheckCategoryByIdMiddleware(makeDbCheckCategoryById(), new CheckFieldIsNumberValidation('id'))
}
