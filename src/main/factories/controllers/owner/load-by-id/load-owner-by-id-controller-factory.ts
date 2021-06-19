import { makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { makeDbLoadOwnerById } from '@/main/factories/usecases'
import { makeValidationId } from '@/main/factories/validation'
import { LoadOwnerByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadOwnerByIdController = (): Controller => {
  const controller = new LoadOwnerByIdController(makeDbLoadOwnerById())
  const validationRequest = makeValidationRequestDecorator(controller, makeValidationId())
  return makeLogControllerDecorator(validationRequest)
}
