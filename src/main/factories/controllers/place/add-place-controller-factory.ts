import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddPlace } from '@/main/factories/usecases'
import { AddPlaceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'

export const makeAddPlaceController = (): Controller => {
  const controller = new AddPlaceController(new RequiredFieldValidation('name'), makeDbAddPlace())
  return makeLogControllerDecorator(controller)
}
