import { makeDbCheckPlaceById } from '@/main/factories/usecases'
import { CheckPlaceByIdMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation } from '@/validation/validators'

export const makeCheckPlaceByIdMiddleware = (): Middleware => {
  return new CheckPlaceByIdMiddleware(makeDbCheckPlaceById(), new CheckFieldIsNumberValidation('id'))
}
