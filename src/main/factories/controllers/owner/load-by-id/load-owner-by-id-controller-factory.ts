import { makeLoadOwnerByIdValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadOwnerById } from '@/main/factories/usecases'
import { LoadOwnerByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadOwnerByIdController = (): Controller => {
  const controller = new LoadOwnerByIdController(
    makeLoadOwnerByIdValidation(),
    makeDbLoadOwnerById()
  )
  return makeLogControllerDecorator(controller)
}
