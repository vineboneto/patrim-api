import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadPatrimonyByNumber } from '@/main/factories/usecases'
import { LoadPatrimonyByNumberController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadPatrimonyByNumberController = (): Controller => {
  const controller = new LoadPatrimonyByNumberController(makeDbLoadPatrimonyByNumber())
  return makeLogControllerDecorator(controller)
}
