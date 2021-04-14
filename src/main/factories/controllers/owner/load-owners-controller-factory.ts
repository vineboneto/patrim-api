import { Controller } from '@/presentation/protocols'
import { LoadOwnersController } from '@/presentation/controllers'
import { makeLoadOwnersValidation } from '@/main/factories/controllers'
import { makeDbLoadOwners } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'

export const makeLoadOwnersController = (): Controller => {
  const controller = new LoadOwnersController(makeLoadOwnersValidation(), makeDbLoadOwners())
  return makeLogControllerDecorator(controller)
}
