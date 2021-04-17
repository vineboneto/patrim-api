import { makeDbDeletePlace } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { DeletePlaceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDeletePlaceController = (): Controller => {
  const controller = new DeletePlaceController(makeDbDeletePlace())
  return makeLogControllerDecorator(controller)
}
