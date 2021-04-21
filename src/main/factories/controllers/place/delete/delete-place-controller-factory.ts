import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbCheckPlaceById, makeDbDeletePlace } from '@/main/factories/usecases'
import { makeDeletePlaceValidation } from '@/main/factories/controllers'
import { DeletePlaceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { CheckExistPlaceId } from '@/validation/checks'

export const makeDeletePlaceController = (): Controller => {
  const controller = new DeletePlaceController(
    makeDbDeletePlace(),
    new CheckExistPlaceId(makeDbCheckPlaceById(), 'id'),
    makeDeletePlaceValidation()
  )
  return makeLogControllerDecorator(controller)
}
