import { makeDbCheckPlaceById, makeDbUpdatePlace } from '@/main/factories/usecases'
import { makeUpdatePlaceValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdatePlaceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { CheckExistPlaceId } from '@/validation/checks'

export const makeUpdatePlaceController = (): Controller => {
  const controller = new UpdatePlaceController(
    makeUpdatePlaceValidation(),
    new CheckExistPlaceId(makeDbCheckPlaceById(), 'id'),
    makeDbUpdatePlace()
  )
  return makeLogControllerDecorator(controller)
}
