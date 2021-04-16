import { makeDbCheckOwnerById } from '@/main/factories/usecases'
import { CheckOwnerByIdMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation } from '@/validation/validators'

export const makeCheckOwnerByIdMiddleware = (): Middleware => {
  return new CheckOwnerByIdMiddleware(makeDbCheckOwnerById(), new CheckFieldIsNumberValidation('id'))
}
