import { CheckSectorByIdMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols'
import { makeDbCheckSectorById } from '../usecases'

export const makeCheckSectorByIdMiddleware = (): Middleware => {
  return new CheckSectorByIdMiddleware(makeDbCheckSectorById())
}
