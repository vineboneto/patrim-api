import { makeDbCheckSectorById } from '@/main/factories/usecases'
import { CheckSectorByIdMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation } from '@/validation/validators'

export const makeCheckSectorByIdMiddleware = (): Middleware => {
  return new CheckSectorByIdMiddleware(makeDbCheckSectorById(), new CheckFieldIsNumberValidation('id'))
}
