import { makeDbAddSector } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { AddSectorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'

export const makeAddSectorController = (): Controller => {
  const controller = new AddSectorController(makeDbAddSector(), new RequiredFieldValidation('name'))
  return makeLogControllerDecorator(controller)
}
