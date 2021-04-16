import { makeDbSaveSector } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { SaveSectorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'

export const makeSaveSectorController = (): Controller => {
  const controller = new SaveSectorController(makeDbSaveSector(), new RequiredFieldValidation('name'))
  return makeLogControllerDecorator(controller)
}
