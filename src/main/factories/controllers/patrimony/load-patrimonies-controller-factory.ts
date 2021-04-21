import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadPatrimonies } from '@/main/factories/usecases'
import { LoadPatrimoniesController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadPatrimoniesController = (): Controller => {
  const controller = new LoadPatrimoniesController(makeDbLoadPatrimonies())
  return makeLogControllerDecorator(controller)
}
