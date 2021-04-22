import { makeLoadPatrimoniesByOwnerIdValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadPatrimoniesByOwnerId } from '@/main/factories/usecases'
import { LoadPatrimoniesByOwnerIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadPatrimoniesByOwnerIdController = (): Controller => {
  const controller = new LoadPatrimoniesByOwnerIdController(
    makeLoadPatrimoniesByOwnerIdValidation(),
    makeDbLoadPatrimoniesByOwnerId()
  )
  return makeLogControllerDecorator(controller)
}
