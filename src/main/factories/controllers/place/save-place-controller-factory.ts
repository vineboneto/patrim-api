import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbSavePlace } from '@/main/factories/usecases'
import { SavePlaceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'

export const makeSavePlaceController = (): Controller => {
  const controller = new SavePlaceController(new RequiredFieldValidation('name'), makeDbSavePlace())
  return makeLogControllerDecorator(controller)
}
