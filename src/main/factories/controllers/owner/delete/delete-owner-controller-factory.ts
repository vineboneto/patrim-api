import { makeDeleteOwnerValidation } from '@/main/factories/controllers'
import { makeDbCheckOwnerById, makeDbDeleteOwner } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { DeleteOwnerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { CheckExistOwnerId } from '@/validation/checks'

export const makeDeleteOwnerController = (): Controller => {
  const controller = new DeleteOwnerController(
    makeDbDeleteOwner(),
    new CheckExistOwnerId(makeDbCheckOwnerById(), 'id'),
    makeDeleteOwnerValidation()
  )
  return makeLogControllerDecorator(controller)
}
