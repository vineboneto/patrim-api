import { makeDbAddSector } from '@/main/factories/usecases'
import { makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { AddSectorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'

export const makeAddSectorController = (): Controller => {
  const controller = new AddSectorController(makeDbAddSector())
  const validationRequest = makeValidationRequestDecorator(controller, new RequiredFieldValidation('name'))
  return makeLogControllerDecorator(validationRequest)
}
