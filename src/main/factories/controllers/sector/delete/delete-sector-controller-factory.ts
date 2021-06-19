import { makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { makeDbDeleteSector } from '@/main/factories/usecases'
import { makeCheckAccessDataSector } from '@/main/factories/controllers'
import { makeValidationId } from '@/main/factories/validation'
import { DeleteSectorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDeleteSectorController = (): Controller => {
  const controller = new DeleteSectorController(makeDbDeleteSector())
  const accessData = makeCheckAccessDataSector(controller)
  const validationRequest = makeValidationRequestDecorator(accessData, makeValidationId())
  return makeLogControllerDecorator(validationRequest)
}
