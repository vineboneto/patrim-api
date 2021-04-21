import { makeLoadPatrimonyByIdValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadPatrimonyById } from '@/main/factories/usecases'
import { LoadPatrimonyByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadPatrimonyByIdController = (): Controller => {
  const controller = new LoadPatrimonyByIdController(
    makeLoadPatrimonyByIdValidation(),
    makeDbLoadPatrimonyById()
  )
  return makeLogControllerDecorator(controller)
}
