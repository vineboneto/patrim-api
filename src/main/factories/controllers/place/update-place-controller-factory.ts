import { Controller } from '@/presentation/protocols'
import { UpdatePlaceController } from '@/presentation/controllers'
import { makeUpdatePlaceValidation } from '@/main/factories/controllers'
import { makeDbCheckAccountById, makeDbCheckPlaceById, makeDbSavePlace } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'

export const makeUpdatePlaceController = (): Controller => {
  const controller = new UpdatePlaceController(
    makeDbSavePlace(),
    makeDbCheckAccountById(),
    makeDbCheckPlaceById(),
    makeUpdatePlaceValidation()
  )
  return makeLogControllerDecorator(controller)
}
