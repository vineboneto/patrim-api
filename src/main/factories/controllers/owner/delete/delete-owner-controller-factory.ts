import { makeDeleteOwnerValidation, makeDeleteCheckExistOwnerValidation } from '@/main/factories/controllers'
import { makeDbDeleteOwner } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { DeleteOwnerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDeleteOwnerController = (): Controller => {
  const controller = new DeleteOwnerController(
    makeDbDeleteOwner(),
    makeDeleteCheckExistOwnerValidation(),
    makeDeleteOwnerValidation()
  )
  return makeLogControllerDecorator(controller)
}
