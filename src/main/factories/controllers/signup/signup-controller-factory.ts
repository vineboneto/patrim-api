import { makeSignUpValidation } from '@/main/factories/controllers'
import { makeDbAddAccount, makeDbAuthentication } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeSignUpValidation(), makeDbAddAccount(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
