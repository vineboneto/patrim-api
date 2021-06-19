import { makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { makeDbLoadPatrimoniesBySectorId } from '@/main/factories/usecases'
import { makeValidationId } from '@/main/factories/validation'
import { LoadPatrimoniesBySectorIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadPatrimoniesBySectorIdController = (): Controller => {
  const controller = new LoadPatrimoniesBySectorIdController(makeDbLoadPatrimoniesBySectorId())
  const validationRequest = makeValidationRequestDecorator(controller, makeValidationId())
  return makeLogControllerDecorator(validationRequest)
}
