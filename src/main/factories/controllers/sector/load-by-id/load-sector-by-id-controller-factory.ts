import { makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { makeDbLoadSectorById } from '@/main/factories/usecases'
import { makeValidationId } from '@/main/factories/validation'
import { LoadSectorByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadSectorByIdController = (): Controller => {
  const controller = new LoadSectorByIdController(makeDbLoadSectorById())
  const validationRequest = makeValidationRequestDecorator(controller, makeValidationId())
  return makeLogControllerDecorator(validationRequest)
}
