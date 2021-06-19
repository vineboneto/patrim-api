import { makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { makeDbLoadPatrimoniesByOwnerId } from '@/main/factories/usecases'
import { makeValidationId } from '@/main/factories/validation'
import { LoadPatrimoniesByOwnerIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadPatrimoniesByOwnerIdController = (): Controller => {
  const controller = new LoadPatrimoniesByOwnerIdController(makeDbLoadPatrimoniesByOwnerId())
  const validationRequest = makeValidationRequestDecorator(controller, makeValidationId())
  return makeLogControllerDecorator(validationRequest)
}
