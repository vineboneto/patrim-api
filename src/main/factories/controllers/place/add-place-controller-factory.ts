import { Controller } from '@/presentation/protocols'
import { AddPlaceController } from '@/presentation/controllers'
import { makeAddPlaceValidation } from '@/main/factories/controllers'
import { makeDbCheckAccountById, makeDbSavePlace } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'

export const makeAddPlaceController = (): Controller => {
  const controller = new AddPlaceController(
    makeDbSavePlace(),
    makeDbCheckAccountById(),
    makeAddPlaceValidation()
  )
  return makeLogControllerDecorator(controller)
}
