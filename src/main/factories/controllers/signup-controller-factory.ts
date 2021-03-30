import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAddAccount, makeDbAuthentication } from '@/main/factories/usecases'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeSignUpValidation(), makeDbAddAccount(), makeDbAuthentication())
}
