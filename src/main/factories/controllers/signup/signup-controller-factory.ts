import { makeSignUpValidation } from '@/main/factories/controllers'
import { makeDbAddAccount, makeDbAuthentication } from '@/main/factories/usecases'
import { makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeDbAuthentication())
  const validationSpy = makeValidationRequestDecorator(controller, makeSignUpValidation())
  return makeLogControllerDecorator(validationSpy)
}
