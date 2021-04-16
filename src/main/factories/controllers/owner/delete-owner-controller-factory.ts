import { DeleteOwnerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDbDeleteOwner } from '../../usecases'

export const makeDeleteOwnerController = (): Controller => {
  const controller = new DeleteOwnerController(makeDbDeleteOwner())
  return makeLogControllerDecorator(controller)
}
