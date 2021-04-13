import { makeCheckSectorByIdMiddleware } from '@/main/factories/middlewares'
import { adaptMiddleware } from '@/main/adapters'

export const checkSectorId = adaptMiddleware(makeCheckSectorByIdMiddleware())
