import { CheckOwnerByIdMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols'
import { makeDbCheckOwnerById } from '../usecases'

export const makeCheckOwnerByIdMiddleware = (): Middleware => {
  return new CheckOwnerByIdMiddleware(makeDbCheckOwnerById())
}
