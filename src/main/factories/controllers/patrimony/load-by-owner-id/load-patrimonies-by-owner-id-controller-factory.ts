import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadPatrimoniesByOwnerId } from '@/main/factories/usecases'
import { LoadPatrimoniesByOwnerIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLoadPatrimoniesByOwnerIdValidation } from './load-patrimonies-by-owner-id-validation-factory'

export const makeLoadPatrimoniesByOwnerIdController = (): Controller => {
  const controller = new LoadPatrimoniesByOwnerIdController(
    makeLoadPatrimoniesByOwnerIdValidation(),
    makeDbLoadPatrimoniesByOwnerId()
  )
  return makeLogControllerDecorator(controller)
}
