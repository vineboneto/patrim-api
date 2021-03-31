import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers'
import { makeDbAuthentication } from '@/main/factories/usecases'
import { makeLoginValidation } from '@/main/factories/controllers'

export const makeLoginController = (): Controller => {
  return new LoginController(makeLoginValidation(), makeDbAuthentication())
}
