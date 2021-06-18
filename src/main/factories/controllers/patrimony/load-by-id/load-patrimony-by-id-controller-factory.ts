import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadPatrimonyById } from '@/main/factories/usecases'
import { makeValidationId } from '@/main/factories/validation'
import { LoadPatrimonyByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadPatrimonyByIdController = (): Controller => {
  const controller = new LoadPatrimonyByIdController(
    makeValidationId(),
    makeDbLoadPatrimonyById()
  )
  return makeLogControllerDecorator(controller)
}
