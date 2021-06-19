import { makeDbAuthentication } from '@/main/factories/usecases'
import { makeLoginValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication())
  const validationRequest = makeValidationRequestDecorator(controller, makeLoginValidation())
  return makeLogControllerDecorator(validationRequest)
}
