import { makeDbUpdateSector } from '@/main/factories/usecases'
import { makeUpdateSectorValidation, makeCheckAccessDataSector } from '@/main/factories/controllers'
import { makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { UpdateSectorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateSectorController = (): Controller => {
  const controller = new UpdateSectorController(makeDbUpdateSector())
  const accessData = makeCheckAccessDataSector(controller)
  const validationRequest = makeValidationRequestDecorator(accessData, makeUpdateSectorValidation())
  return makeLogControllerDecorator(validationRequest)
}
