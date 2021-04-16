import { DeleteOwnerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbDeleteOwner } from '@/main/factories/usecases'

export const makeDeleteOwnerController = (): Controller => {
  const controller = new DeleteOwnerController(makeDbDeleteOwner())
  return makeLogControllerDecorator(controller)
}
